#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Utility functions for processing novel chapters and filtering promotional content.
"""

import re

BLACKLISTED_WORDS = {
    "求票", "月票", "投票",
    "首订", "订阅", "追订", "追读",
    "加更"
}

PROMOTIONAL_KEYWORDS = {
    "推荐", "月票", "收藏", "新书", "加更", "成绩", "建议", "太监",
    "烂尾", "完本", "更新", "支持", "感谢", "推书", "盟主", "求票"
}

def apply_font_mapping_to_text(text: str, font_map: dict):
    """
    Apply a font mapping to the given text.

    This function iterates over each character in the input text and replaces it with the corresponding
    value from the mapping dictionary if one exists. If a character does not have a mapping, it remains unchanged.

    Args:
        text (str): The input text containing characters to be mapped (e.g., obfuscated font characters).
        font_map (dict): A dictionary mapping characters (keys) to their intended (real) characters (values).

    Returns:
        str: The resulting text after applying the font mapping.
    """
    return ''.join(font_map.get(char, char) for char in text)

def format_chapter(title: str, paragraphs: str, authorSay: str = "") -> str:
    """
    Generate formatted chapter text:
    - Begin with the title, followed by two newline characters.
    - Split the paragraphs string into lines, strip each line of leading/trailing whitespace,
    and join non-empty lines with two newline characters.
    - If authorSay is provided, append "---" followed by the author's comment.
    
    Parameters:
        title (str): The title of the chapter.
        paragraphs (str): A multi-line string where each line represents a paragraph.
        authorSay (str, optional): The author's comment. Defaults to an empty string.
    
    Returns:
        str: The formatted chapter text.
    """
    result = f"{title}\n\n{paragraphs.strip()}"
    if authorSay.strip():
        result += f"\n\n---\n\n作者说:\n\n{authorSay.strip()}"

    formatted_result = "\n\n".join(
        line.strip() for line in result.splitlines() if line.strip()
    )

    return formatted_result

def clean_chapter_title(title: str) -> str:
    """
    Clean a novel chapter title by removing unwanted promotional content in brackets.

    This function searches for both Chinese and English parentheses in the title.
    If the content inside contains any blacklisted keywords (e.g., '求票', '加更'),
    the entire parenthetical section is removed. Otherwise, the title is left unchanged.

    Args:
        title (str): The original chapter title (may include advertising phrases in brackets).

    Returns:
        str: The cleaned chapter title with unwanted bracketed content removed.
    """
    bracket_pattern = re.compile(r"[\(（](.*?)[\)）]")
    cleaned_title = title

    matches = bracket_pattern.findall(title)
    for content in matches:
        if any(word in content for word in BLACKLISTED_WORDS):
            cleaned_title = re.sub(r"[\(（]" + re.escape(content) + r"[\)）]", "", cleaned_title)

    return cleaned_title.strip()

def is_promotional_line(line: str) -> bool:
    """
    Determine if a line is likely to be promotional / ad-like.
    """
    lower_line = line.lower()
    if any(keyword in lower_line for keyword in PROMOTIONAL_KEYWORDS):
        return True
    if re.search(r"\b\d{1,4}k\b", lower_line):
        return True
    return False
