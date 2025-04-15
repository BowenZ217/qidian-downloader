#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
This module provides Qidian-specific HTML (with `r-font-encrypt`) parsers based on the `BaseParser`.

- `QidianEncryptedChapterParser`: Parses chapter content, VIP status, and encryption state.
"""

import json
import os
import re
import logging

import cssutils
from bs4 import Tag

from .base import BaseParser
from ..utils.logger import log_message
from ..utils.ocr_utils import OCRUtils
from ..utils.file_saver import save_as_txt
from ..utils.font_utils import download_font
from ..utils.text_utils import format_chapter, apply_font_mapping_to_text

cssutils.log.setLevel(logging.CRITICAL)

class QidianEncryptedChapterParser(BaseParser):
    """
    QidianEncryptedChapterParser parses the HTML (with `r-font-encrypt`) content of a Qidian chapter page,
    extracting details such as VIP status, encryption status, and chapter content.
    
    Attributes:
        _book_id (str): The ID of the book to which the chapter belongs.
    """

    def __init__(self, html_str: str = "", book_id: str = "",
                 save_html: bool = True, local_cache_dir: str = "./local_cache",
                 use_freq=True, use_ocr=False):
        """
        Initialize the QidianChapterParser with an optional HTML string and book ID,
        along with HTML caching settings.
        
        Args:
            html_str (str): Raw HTML content to be parsed.
            book_id (str): The ID of the book. Defaults to an empty string.
            save_html (bool): Flag to determine whether to save the HTML content to disk. Defaults to True.
            local_cache_dir (str): Directory path for storing cached HTML content. Defaults to "./local_cache".
        """
        # Initialize the base parser with the HTML string and caching settings.
        super().__init__(html_str, save_html, local_cache_dir)
        
        self._book_id = book_id
        if self._save_html and self._book_id:
            self.html_plain_folder = os.path.join(self._local_cache_dir, self._book_id, 'html_plain')
            os.makedirs(self.html_plain_folder, exist_ok=True)
            self.html_encrypted_folder = os.path.join(self._local_cache_dir, self._book_id, 'html_encrypted')
            os.makedirs(self.html_encrypted_folder, exist_ok=True)
        else:
            self.html_plain_folder = None
            self.html_encrypted_folder = None
        self._use_freq = use_freq
        self._use_ocr = use_ocr
        self._ocr_utils = OCRUtils(use_ocr=use_ocr, use_freq=use_freq, save_image=False)

    def set_book_id(self, book_id: str):
        """
        Set or update the book ID for the parser.
        
        Args:
            book_id (str): The new book ID to set.
        """
        self._book_id = book_id
        if self._save_html and self._book_id:
            self.html_encrypted_folder = os.path.join(self._local_cache_dir, self._book_id, 'html_encrypted')
            os.makedirs(self.html_encrypted_folder, exist_ok=True)
        else:
            self.html_encrypted_folder = None

    def get_book_id(self) -> str:
        """
        Retrieve the current book ID.
        
        Returns:
            str: The current book ID.
        """
        return self._book_id

    def is_vip(self) -> bool:
        """
        Check if the chapter requires VIP access.
        
        Returns:
            bool: True if VIP access is required, False otherwise.
        """
        vip_keywords = ["这是VIP章节", "需要订阅", "订阅后才能阅读", "无法阅读", "自动订阅"]
        return any(keyword in self._html_str for keyword in vip_keywords)

    def is_encrypted(self) -> bool:
        """
        Check if the chapter content is encrypted.
        
        Returns:
            bool: True if the content is encrypted, False otherwise.
        """
        main_content = self.soup.select_one('div#app div#reader-content main')
        if not main_content:
            return False
        return 'r-font-encrypt' in main_content.get('class', [])
    
    def _save_html_to_disk(self, chapter_id: int):
        """
        Save the current HTML content to disk.

        Args:
            chapter_id (int): The chapter's identifier.
        """
        if not self._save_html or not self._book_id:
            return

        folder = self.html_encrypted_folder if self.is_encrypted() else self.html_plain_folder
        if folder:
            html_path = os.path.join(folder, f"{chapter_id}.html")
            save_as_txt(self._html_str, html_path)
        return
    
    def find_ssr_pageContext(self) -> dict:
        """
        Extracts the SSR-injected pageContext from HTML as a Python dictionary.
        This is typically found in a <script id="vite-plugin-ssr_pageContext"> tag.

        Returns:
            dict: Parsed JSON object containing SSR pageContext.
        """
        try:
            script_tag = self.soup.find('script', {'id': 'vite-plugin-ssr_pageContext'})
            if script_tag:
                json_data = script_tag.string.strip()
                data_dict = json.loads(json_data)
                return data_dict
        except Exception as e:
            log_message(f"[QidianEncryptedChapterParser] Error at find_ssr_pageContext: {e}", level="warning")
        return {}
    
    def _extract_encrypted_paragraphs(self) -> list:
        """
        Extracts paragraph elements under <main id="c-{chapter_id}"> from HTML
        and converts them to a nested data structure for further processing.

        Args:
            html_str (str): Full HTML content.
            chapter_id (int): ID used to locate <main id="c-{chapter_id}">.

        Returns:
            list: List of parsed <p> paragraph data.
        """
        def parse_element(elem):
            # 如果是 NavigableString, 则直接返回文本 (或跳过空白)
            if not isinstance(elem, Tag):
                return None
            result = {
                "tag": elem.name,
                "attrs": dict(elem.attrs),
                "data": []
            }
            for child in elem.contents:
                if isinstance(child, Tag):
                    parsed = parse_element(child)
                    if parsed:
                        result["data"].append(parsed)
                else:
                    text = child
                    if text:
                        result["data"].append(text)
            return result

        main_tag = self.soup.select_one('div#app div#reader-content main')

        result = []
        for p in main_tag.find_all('p'):
            parsed_p = parse_element(p)
            if parsed_p:
                result.append(parsed_p)

        return result
    
    def _parse_encrypted_rule(self, css_str: str) -> dict:
        """
        Parses relevant CSS rules and transforms them into a structured mapping
        that can later be applied to HTML tags during rendering.

        Handles:
        - font-size:0 (to delete content)
        - transform: scaleX(-1) (mirrored content)
        - ::before / ::after with attr() or hardcoded characters
        - class-specific rules for rendering

        Args:
            css_str (str): Raw CSS string extracted from the HTML.

        Returns:
            dict: {
                "rules": parsed CSS rules,
                "orders": selector rendering order list
            }
        """
        def parse_selector_style(style, selector_str) -> dict:
            data = {}

            font_size = style.getPropertyValue('font-size')
            transform = style.getPropertyValue('transform')
            content = style.getPropertyValue('content')

            if font_size == '0':
                if '::first-letter' in selector_str:
                    data['delete-first'] = True
                else:
                    data['delete-all'] = True

            if transform == 'scalex(-1)':
                data['transform-x_-1'] = True

            if '::after' in selector_str and content:
                if 'attr(' in content:
                    attr_name = content.split('attr(')[1].split(')')[0]
                    data['append-end-attr'] = attr_name
                else:
                    data['append-end-char'] = content.strip('"').strip("'")

            if '::before' in selector_str and content:
                if 'attr(' in content:
                    attr_name = content.split('attr(')[1].split(')')[0]
                    data['append-start-attr'] = attr_name
                else:
                    data['append-start-char'] = content.strip('"').strip("'")

            return data

        sheet = cssutils.parseString(css_str)
        orders = []
        css_rules = {}

        for rule in sheet:
            if rule.type != rule.STYLE_RULE:
                continue

            selector = rule.selectorText
            style = rule.style

            # 1. 提取 order 属性
            order_val = style.getPropertyValue('order')
            if order_val:
                orders.append((selector, order_val))

            temp = parse_selector_style(style, selector)

            # 2. sy 类处理
            if selector.startswith('.sy-'):
                if 'sy' not in css_rules:
                    css_rules['sy'] = {}
                css_rules['sy'][selector[1:]] = temp

            # 3. .p* 类处理
            elif selector.startswith('.p') and ' ' in selector:
                parts = selector.split()
                class_str = parts[0].replace('.', '')
                tag_part = parts[1].split('::')[0]

                if class_str not in css_rules:
                    css_rules[class_str] = {}

                if tag_part not in css_rules[class_str]:
                    css_rules[class_str][tag_part] = temp
                else:
                    css_rules[class_str][tag_part].update(temp)

        # 按照 order 数值升序排序
        orders.sort(key=lambda x: int(x[1]))

        return {
            "rules": css_rules,
            "orders": orders
        }

    def _parse_encrypted_paragraph_names(self, rules: dict) -> set:
        """
        Parse and extract possible paragraph names from the rules dictionary.

        This function processes a dictionary with a "rules" key, which maps to multiple groups
        of rule definitions. It extracts all the keys from groups except for the group named "sy".

        Args:
            rules (dict): A dictionary containing a "rules" key. The value of "rules" should be 
                        a dictionary mapping group names to another dictionary of rule definitions.

        Returns:
            set: A set of paragraph names (keys) extracted from the rule groups, excluding any keys
                from the "sy" group.
        """
        paragraph_names = set()
        if "rules" in rules:
            for group, group_rules in rules["rules"].items():
                # Skip the group named "sy".
                if group == "sy":
                    continue
                # Add all keys from the current group to the result set.
                paragraph_names.update(group_rules.keys())
        
        return paragraph_names
    
    def _parse_encrypted_end_number(self, main_paragraphs: list, paragraph_names: set):
        """
        Recursively parse a list of dictionaries to extract and count ending numbers from "tag" keys.

        This function traverses a nested data structure (lists and dictionaries) where each dictionary
        may contain a "tag" key. If a dictionary contains a "tag", the function checks whether its value 
        starts with any of the given paragraph names (provided in the set `paragraph_names`). If it does, 
        the function extracts the remaining part of the tag (i.e. the substring after the matched prefix)
        and, if this remainder is a valid number, updates a count for that number in an internal dictionary.

        After processing the entire structure, the function returns the most common ending number. 
        In case of a tie, the largest number is returned.

        Args:
            main_paragraphs (list): A list of dictionaries (and possibly nested lists/dicts) to be parsed.
            paragraph_names (set): A set of string prefixes used to match the beginning of a "tag" value.

        Returns:
            int or None: The ending number that appears most frequently (with ties broken by choosing the 
                        larger number). Returns None if no valid ending number is found.
        """
        # Dictionary to keep track of occurrence counts for each ending number.
        end_numbers = {}
        paragraph_names = sorted(paragraph_names, key=lambda x: len(x), reverse=True)

        def rec_parse(item):
            """
            Recursive helper function to traverse the nested structure.

            If the item is a list, it iterates over each element and recalls itself.
            If the item is a dictionary, it checks for the "tag" key and processes it if present.
            The function continues to traverse any nested dictionaries or lists found in the values.
            """
            if isinstance(item, list):
                for element in item:
                    rec_parse(element)
            elif isinstance(item, dict):
                tag_value = item.get("tag")
                if isinstance(tag_value, str):
                    # Check if the tag_value starts with any of the paragraph_names prefixes.
                    for prefix in paragraph_names:
                        if tag_value.startswith(prefix):
                            # Extract the remaining substring after the prefix.
                            remaining = tag_value[len(prefix):]
                            if remaining.isdigit():
                                num = int(remaining)
                                end_numbers[num] = end_numbers.get(num, 0) + 1
                            break  # If one prefix matches, no need to check others.
                # Recursively process every value in the dictionary.
                for value in item.values():
                    if isinstance(value, (dict, list)):
                        rec_parse(value)

        rec_parse(main_paragraphs)

        if not end_numbers:
            log_message(f"[QidianEncryptedChapterParser] No valid ending numbers found", level="warning")
            return None

        # Sort the numbers by their count, then by the number itself (both in descending order).
        # If there is a tie in frequency, choose the largest number.
        sorted_numbers = sorted(end_numbers.items(), key=lambda x: (x[1], x[0]), reverse=True)

        # Log the top 3 most common ending numbers for debugging
        top_three = sorted_numbers[:3]
        debug_message = "[QidianEncryptedChapterParser] Top 3 end numbers:\n"
        for num, count in top_three:
            debug_message += f"- {num}: {count}\n"
        log_message(debug_message)

        most_common = sorted_numbers[0][0]
        return most_common
    
    def _render_encrypted_paragraphs(self, main_paragraphs, rules, end_number):
        """
        Applies the parsed CSS rules to the paragraph structure and reconstructs the visible text.

        Handles special class styles like .sy-*, text order control, mirrored characters, etc.

        Args:
            main_paragraphs (list): Paragraph structures from extract_paragraphs_recursively.
            rules (dict): Parsed CSS rules from parse_rule().
            end_number (str): HTML tag suffix (e.g. span123 → 123).

        Returns:
            tuple[str, list]: Final reconstructed paragraph string and list of mirrored characters.
        """
        orders = rules.get("orders", [])
        rules = rules.get("rules", {})
        refl_list = []

        def apply_rule(data, rule):
            if rule.get("delete-all", False):
                return ""

            curr_str = ""
            if isinstance(data.get("data"), list) and data["data"]:
                first_data = data["data"][0]
                if isinstance(first_data, str):
                    curr_str += first_data

            if rule.get("delete-first", False):
                if len(curr_str) <= 1:
                    curr_str = ""
                else:
                    curr_str = curr_str[1:]

            curr_str += rule.get("append-end-char", "")

            attr_name = rule.get("append-end-attr", "")
            if attr_name:
                curr_str += data.get("attrs", {}).get(f"{attr_name}{end_number}", "")

            curr_str = rule.get("append-start-char", "") + curr_str

            attr_name = rule.get("append-start-attr", "")
            if attr_name:
                curr_str = data.get("attrs", {}).get(f"{attr_name}{end_number}", "") + curr_str

            if rule.get("transform-x_-1", False):
                refl_list.append(curr_str)
            return curr_str

        paragraphs_str = ''
        for paragraph in main_paragraphs:
            class_list = paragraph.get("attrs", {}).get("class", [])
            p_class_str = next((c for c in class_list if c.startswith('p')), None)
            curr_datas = paragraph.get("data", [])

            ordered_cache = {}
            for data in curr_datas:
                # 文本节点直接加
                if isinstance(data, str):
                    paragraphs_str += data
                    continue

                if isinstance(data, dict):
                    tag = data.get("tag", "")
                    attrs = data.get("attrs", {})

                    # 跳过 span.review
                    if tag == "span" and "class" in attrs and "review" in attrs["class"]:
                        continue

                    # sy 类型标签处理
                    if tag == "y":
                        tag_class_list = attrs.get("class", [])
                        tag_class = next((c for c in tag_class_list if c.startswith("sy-")), None)

                        if tag_class in rules.get("sy", {}):
                            curr_rule = rules["sy"][tag_class]
                            paragraphs_str += apply_rule(data, curr_rule)
                        continue
                    
                    if not p_class_str:
                        log_message(f"[QidianEncryptedChapterParser] not find p_class_str: {class_list}", level="warning")
                        continue
                    # 普通标签处理，根据 orders 顺序匹配
                    for ord_selector, ord_id in orders:
                        tag_name = f"{ord_selector}{end_number}"
                        if data.get("tag") != tag_name:
                            continue
                        curr_rule = rules.get(p_class_str, {}).get(ord_selector)
                        curr_rule = curr_rule if curr_rule else {}
                        ordered_cache[ord_selector] = apply_rule(data, curr_rule)
                        break  # 每个 data 匹配一个 rule 就够了
            # 最后按 orders 顺序拼接
            for ord_selector, ord_id in orders:
                if ord_selector in ordered_cache:
                    paragraphs_str += ordered_cache[ord_selector]

            paragraphs_str += '\n\n'  # 每段落之间加空行

        return paragraphs_str, refl_list
    
    def get_content(self, chapter_id: int) -> str:
        """
        Extract and return the formatted textual content of a chapter from the given HTML.

        This method performs the following steps:
          1. 

        Args:
            chapter_id (int): The chapter's identifier.

        Returns:
            str: The formatted chapter text or an empty string if the chapter is encrypted or parsing fails.
        """
        chapter_str = ''
        try:
            ssr_pageContext = self.find_ssr_pageContext()
            page_context = ssr_pageContext.get('pageContext', {})
            page_props = page_context.get('pageProps', {})
            page_data = page_props.get('pageData', {})
            ssr_chapterInfo = page_data.get('chapterInfo')
            if ssr_chapterInfo is None:
                log_message(f"[QidianEncryptedChapterParser] ssr_chapterInfo not found for chapter '{chapter_id}'.", level="warning")
                return ''
            css_str = ssr_chapterInfo['css']
            randomFont_str = ssr_chapterInfo['randomFont']
            fixedFontWoff2_str = ssr_chapterInfo['fixedFontWoff2']
            # fixedFontTtf_str = ssr_chapterInfo['fixedFontTtf']
            chapterName_str = ssr_chapterInfo['chapterName']
            authorSay_str = ssr_chapterInfo['authorSay']

            # Save the raw HTML locally if enabled.
            # self._save_html_to_disk(chapter_id)
        except Exception as e:
            log_message(f"[QidianEncryptedChapterParser] Fail to get ssr_pageContext for '{chapter_id}': {e}", level="warning")
            return ""

        debug_folder_path = os.path.join(self._local_cache_dir, "chapters", str(chapter_id))
        os.makedirs(debug_folder_path, exist_ok=True)

        # Save / Download Fonts
        randomFont_dict = json.loads(randomFont_str)
        font_list = randomFont_dict['data']
        font_bytes = bytes(font_list)
        randomFont_path = os.path.join(self._local_cache_dir, 'randomFont.ttf')
        with open(randomFont_path, 'wb') as f:
            f.write(font_bytes)

        fixedFont_path = download_font(fixedFontWoff2_str, self._local_cache_dir)

        # Extract and render paragraphs from HTML with CSS rules
        main_paragraphs = self._extract_encrypted_paragraphs()
        if not main_paragraphs:
            log_message(f"[QidianEncryptedChapterParser] Warning: Fail to parse paragraphs for chapter '{chapter_id}'", level="warning")
            return ""
        main_paragraphs_path = os.path.join(debug_folder_path, f"main_paragraphs_debug.json")
        with open(main_paragraphs_path, 'w', encoding='utf-8') as f:
            json.dump(main_paragraphs, f, ensure_ascii=False, indent=2)

        paragraphs_rules = self._parse_encrypted_rule(css_str)
        paragraphs_rules_path = os.path.join(debug_folder_path, f"paragraphs_rules_debug.json")
        with open(paragraphs_rules_path, 'w', encoding='utf-8') as f:
            json.dump(paragraphs_rules, f, ensure_ascii=False, indent=2)

        paragraph_names = self._parse_encrypted_paragraph_names(paragraphs_rules)
        end_number = self._parse_encrypted_end_number(main_paragraphs, paragraph_names)
        paragraph_names_path = os.path.join(debug_folder_path, f"paragraph_names_debug.txt")
        with open(paragraph_names_path, 'w', encoding='utf-8') as f:
            temp = f"names:\n{paragraph_names}\n\nend_number: {end_number}"
            f.write(temp)

        if not end_number:
            log_message(f"[QidianEncryptedChapterParser] Warning: No end_number found after parsing chapter '{chapter_id}'", level="warning")
            return ""
        paragraphs_str, refl_list = self._render_encrypted_paragraphs(main_paragraphs, paragraphs_rules, end_number)

        # Run OCR + fallback mapping
        char_set = set(c for c in paragraphs_str if c not in {' ', '\n', '\u3000'})
        refl_set = set(refl_list)
        char_set = char_set - refl_set
        paragraph_names_path = os.path.join(debug_folder_path, f"char_set_debug.txt")
        with open(paragraph_names_path, 'w', encoding='utf-8') as f:
            temp = f"char_set:\n{char_set}\n\nrefl_set: {refl_set}"
            f.write(temp)
        
        mapping_result = self._ocr_utils.generate_font_mapping(
            fixedFont_path,
            randomFont_path,
            char_set,
            refl_set,
            debug_folder_path
        )

        # Reconstruct final readable text
        final_paragraphs_str = apply_font_mapping_to_text(paragraphs_str, mapping_result)
        if not final_paragraphs_str:
            return ""
        chapter_str = format_chapter(chapterName_str, final_paragraphs_str, authorSay_str)
        return chapter_str
