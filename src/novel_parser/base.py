#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
This module defines the abstract base class `BaseParser` for HTML content parsing.
All site-specific parsers (e.g., Qidian) should inherit from this class and implement 
its abstract methods for parsing book information, chapter content, and other metadata.
"""

import os
from bs4 import BeautifulSoup

from ..utils.logger import log_message

class BaseParser:
    """
    Abstract base class for parsing HTML content from online novel platforms.
    
    Subclasses should implement the specific logic for parsing VIP status,
    encryption, content extraction, and book metadata.

    Attributes:
        soup (BeautifulSoup): Parsed HTML content using BeautifulSoup.
        _save_html (bool): Flag indicating whether to save HTML content locally.
        _local_cache_dir (str): Directory for caching HTML content locally.
    """

    def __init__(self, html_str: str = "", save_html: bool = True, local_cache_dir: str = "./local_cache"):
        """
        Initialize the parser with an optional HTML string and caching settings.
        
        Args:
            html_str (str): Raw HTML content to be parsed.
            save_html (bool): Flag to determine whether to save the HTML content to disk.
                              Defaults to True.
            local_cache_dir (str): Directory path for storing cached HTML content.
                                   Defaults to "./local_cache".
        """
        self._html_str = html_str
        self._save_html = save_html
        self._local_cache_dir = local_cache_dir

        # Ensure the local cache directory exists if saving HTML is enabled.
        if self._save_html:
            os.makedirs(self._local_cache_dir, exist_ok=True)

        self.set_html_str(html_str)

    def set_html_str(self, html_str: str):
        """
        Set or update the HTML string to be parsed.

        This method allows reusing the same parser instance for different
        HTML content by resetting the internal BeautifulSoup object.

        Args:
            html_str (str): Raw HTML content to be parsed.
        """
        # self.soup = BeautifulSoup(html_str, 'html.parser')
        try:
            self.soup = BeautifulSoup(html_str, "lxml")
        except Exception as e:
            log_message(f"[Soup] Failed to parse with lxml, falling back to html.parser. Error: {e}")
            self.soup = BeautifulSoup(html_str, "html.parser")

    def is_vip(self) -> bool:
        """
        Check if the content is VIP (restricted access).

        Returns:
            bool: True if the content is VIP-only, False otherwise.
        """
        raise NotImplementedError

    def is_encrypted(self) -> bool:
        """
        Check if the content is encrypted or obfuscated.

        Returns:
            bool: True if the content is encrypted, False otherwise.
        """
        raise NotImplementedError

    def get_content(self) -> str:
        """
        Extract the main textual content from the HTML.

        Returns:
            str: The cleaned chapter or article content.
        """
        raise NotImplementedError

    def get_book_info(self) -> dict:
        """
        Extract book metadata such as title, author, and chapter list.

        Returns:
            dict: A dictionary containing book information.
        """
        raise NotImplementedError
