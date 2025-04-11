#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
"""

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
