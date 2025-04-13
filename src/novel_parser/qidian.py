#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
This module provides Qidian-specific HTML parsers based on the `BaseParser`.

- `QidianChapterParser`: Parses chapter content, VIP status, and encryption state.
- `QidianBookParser`: Parses metadata such as book title, author, intro, and chapter list.
- `QidianBookshelfParser`: Parses a user's Qidian bookshelf HTML and returns a list of books.
"""

import json
import os
import re

from .base import BaseParser
from ..utils.logger import log_message
from ..utils.file_saver import save_as_txt
from ..utils.text_utils import format_chapter

class QidianChapterParser(BaseParser):
    """
    QidianChapterParser parses the HTML content of a Qidian chapter page,
    extracting details such as VIP status, encryption status, and chapter content.
    
    Attributes:
        _book_id (str): The ID of the book to which the chapter belongs.
    """

    def __init__(self, html_str: str = "", book_id: str = "", save_html: bool = True, local_cache_dir: str = "./local_cache"):
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

    def set_book_id(self, book_id: str):
        """
        Set or update the book ID for the parser.
        
        Args:
            book_id (str): The new book ID to set.
        """
        self._book_id = book_id
        if self._save_html and self._book_id:
            self.html_plain_folder = os.path.join(self._local_cache_dir, self._book_id, 'html_plain')
            os.makedirs(self.html_plain_folder, exist_ok=True)
        else:
            self.html_plain_folder = None

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
            log_message(f"[X] Error at find_ssr_pageContext: {e}", level="warning")
        return {}
    
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

    def get_content(self, chapter_id: int) -> str:
        """
        Extract and return the formatted textual content of a chapter from the given HTML.

        This method performs the following steps:
          1. Updates the parser's HTML content.
          2. Locates the main content container.
          3. Uses self.is_encrypted() to check if the chapter is encrypted.
          4. Caches the raw HTML to a file under html_plain_folder if saving is enabled.
          5. Extracts SSR page context to obtain chapter metadata (chapter name and author's comment).
          6. Removes review sections and extracts paragraph text.
          7. Formats the chapter content using format_chapter.

        Args:
            chapter_id (int): The chapter's identifier.

        Returns:
            str: The formatted chapter text or an empty string if the chapter is encrypted or parsing fails.
        """
        chapter_str = ''
        try:
            main_content = self.soup.select_one('div#app div#reader-content main')

            if not main_content:
                log_message(f"[X] Content structure not found for chapter '{chapter_id}'.", level="warning")
                return ''

            if self.is_vip():
                return ''

            if self.is_encrypted():
                return ''

            # Save the raw HTML locally if enabled.
            # self._save_html_to_disk(chapter_id)

            # Extract SSR page context. Assumes find_ssr_pageContext is defined and returns the necessary context.
            ssr_pageContext = self.find_ssr_pageContext()
            page_context = ssr_pageContext.get('pageContext', {})
            page_props = page_context.get('pageProps', {})
            page_data = page_props.get('pageData', {})
            ssr_chapterInfo = page_data.get('chapterInfo')
            if ssr_chapterInfo is None:
                log_message(f"[X] ssr_chapterInfo not found for chapter '{chapter_id}'.", level="warning")
                return ''
            chapterName_str = ssr_chapterInfo.get('chapterName', 'Chapter name not found')
            authorSay_str = ssr_chapterInfo.get('authorSay', '')

            # Remove any review sections from the main content.
            for review_span in main_content.select('span.review'):
                review_span.decompose()

            paragraphs = [p.get_text(strip=True) for p in main_content.find_all('p')]
            paragraphs_str = '\n\n'.join(paragraphs)
            chapter_str = format_chapter(chapterName_str, paragraphs_str, authorSay_str)

        except Exception as e:
            log_message(f"[X] An error occurred during parsing chapter '{chapter_id}': {str(e)}", level="warning")
        return chapter_str

class QidianBookParser(BaseParser):
    """
    QidianBookParser parses HTML content of Qidian book pages and extracts book information.
    
    It extracts the following details:
      1. Book name
      2. Author
      3. Cover image URL
      4. Update time
      5. Serialization status
      6. Word count
      7. Book summary
      8. Catalog (volumes with chapters)
    """

    def __init__(self, html_str: str = "", book_id: str = "", save_html: bool = True, local_cache_dir: str = "./local_cache"):
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
        else:
            self.html_plain_folder = None

    def chapter_url_to_id(self, url: str) -> str:
        """
        Extract the chapter ID from the given chapter URL.
        
        This method trims trailing slashes and returns the last segment of the URL.
        
        Args:
            url (str): The chapter URL.

        Returns:
            str: The extracted chapter ID.
        """
        while url.endswith("/"):
            url = url[:-1]
        return url.split("/")[-1]

    def get_book_info(self) -> dict:
        """
        Parse and return book information from the given HTML content.

        Returns:
            dict: A dictionary containing parsed book information.
        """
        book_name = "Book name not found"
        author = "Author not found"
        cover_img = "Cover image not found"
        update_time = "Update time not found"
        serial_status = "Serialization status not found"
        word_count = "Word count not found"
        book_summary = "Book summary not found"
        book_volumes = []

        try:
            soup = self.soup

            # Extract book name
            book_name_element = soup.find("em", id="bookName")
            book_name = book_name_element.get_text(strip=True) if book_name_element else "Book name not found"

            # Extract author
            author_element = soup.find("a", class_="writer")
            author = author_element.get_text(strip=True) if author_element else "Author not found"

            # Extract cover image
            cover_img_parent = soup.find("div", class_="book-img")
            cover_img_element = cover_img_parent.find("img") if cover_img_parent else None
            cover_img = cover_img_element["src"].strip() if cover_img_element and cover_img_element.has_attr("src") else "Cover image not found"

            # Extract update time
            update_time_element = soup.find("span", class_="book-update-time")
            update_time = (update_time_element.get_text(strip=True).replace("更新时间", "").strip() 
                           if update_time_element else "Update time not found")

            # Extract serialization status
            serial_status_element = soup.find("span", class_="blue")
            serial_status = serial_status_element.get_text(strip=True) if serial_status_element else "Serialization status not found"

            # Extract word count using regular expression
            word_count_match = re.search(r'<em>([\d.]+)</em>\s*<cite>(.*?)字</cite>', self._html_str)
            if word_count_match:
                m1 = word_count_match.group(1).strip()  # numeric part
                m2 = word_count_match.group(2).strip()  # unit (if any)
                word_count = f"{m1} {m2}字".strip()
            else:
                word_count = "Unknown word count"

            # Extract book summary
            book_summary_parent = soup.find("div", class_="book-intro")
            book_summary_element = book_summary_parent.find("p") if book_summary_parent else None
            book_summary = book_summary_element.get_text(separator="\n", strip=True) if book_summary_element else "Book summary not found"

            # Extract volume and chapter information
            volume_section = soup.find("div", class_="volume-wrap")
            if volume_section:
                volume_elements = volume_section.find_all("div", class_="volume")
                for volume_div in volume_elements:
                    volume_name_tag = volume_div.find("h3")
                    volume_name = volume_name_tag.get_text(strip=True) if volume_name_tag else "Unknown volume name"

                    # Clean up volume name if it contains extra symbols or text
                    if '·' in volume_name:
                        volume_name = volume_name.split('·')[0].strip()
                    if '订阅本卷' in volume_name:
                        volume_name = volume_name.split('订阅本卷')[-1].strip()

                    # Extract chapters in this volume
                    chapters = []
                    for chapter_li in volume_div.find_all("li"):
                        chapter_a = chapter_li.find("a")
                        if chapter_a:
                            chapter_title = chapter_a.get_text(strip=True)
                            chapter_url = chapter_a.get("href", "").strip()
                            chapter_id = self.chapter_url_to_id(chapter_url)

                            chapters.append({
                                "title": chapter_title,
                                "url": chapter_url,
                                "chapterId": chapter_id
                            })
                    # Append volume data
                    book_volumes.append({
                        "volume_name": volume_name,
                        "chapters": chapters
                    })
        except Exception as e:
            log_message(f'[X] Failed to parse book page: {e}')

        # Organize all extracted data into a dictionary and return
        book_menu = {
            "book_name": book_name,
            "author": author,
            "cover_url": cover_img,
            "update_time": update_time,
            "serial_status": serial_status,
            "word_count": word_count,
            "summary": book_summary,
            "volumes": book_volumes
        }
        return book_menu

class QidianBookshelfParser(BaseParser):

    def __init__(self, html_str: str = ""):
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
        super().__init__(html_str, save_html=False, local_cache_dir="./local_cache")

        if self._save_html and self._book_id:
            self.html_plain_folder = os.path.join(self._local_cache_dir, self._book_id, 'html_plain')
            os.makedirs(self.html_plain_folder, exist_ok=True)
        else:
            self.html_plain_folder = None
    
    def get_bookshelf(self) -> list:
        """
        Parse the Qidian bookshelf HTML and return a list of books.

        Each book is represented as a dictionary with keys:
        - 'title': book name
        - 'author': author name
        - 'latest_chapter': latest chapter title
        - 'book_id': extracted from book URL

        Returns:
            list: A list of dictionaries containing bookshelf entries
        """
        books = []

        for item in self.soup.select('li.book-img-text'):
            title_tag = item.select_one('h4 > a')
            author_tag = item.select_one('.author > a.name')
            chapter_tag = item.select_one('.update > a')

            title = title_tag.get_text(strip=True) if title_tag else 'Unknown Title'
            author = author_tag.get_text(strip=True) if author_tag else 'Unknown Author'
            latest_chapter = chapter_tag.get_text(strip=True) if chapter_tag else 'Unknown Chapter'
            book_url = title_tag['href'] if title_tag and title_tag.has_attr('href') else ''
            book_id = book_url.strip('/').split('/')[-1] if book_url else ''

            books.append({
                'title': title,
                'author': author,
                'latest_chapter': latest_chapter,
                'book_id': book_id
            })

        return books
