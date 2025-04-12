#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
This module provides functions for loading configuration data and creating
a QidianBrowser instance from the configuration.
"""

import os
import yaml
from .browser.qidian_browser import QidianBrowser
from .novel_parser.qidian import QidianBookParser, QidianChapterParser
from .utils.state_manager import get_manual_login_flag, set_manual_login_flag
from .utils.logger import log_message

CUR_DIR = os.getcwd()

def load_config(config_path: str) -> dict:
    """
    Load configuration data from a YAML file.
    
    Args:
        config_path (str): The path to the YAML configuration file.
        
    Returns:
        dict: The configuration data.
    """
    with open(config_path, "r", encoding="utf-8") as f:
        config = yaml.safe_load(f)
    return config

def load_qd_browser(config: dict, login: bool=False) -> QidianBrowser:
    """
    Create a QidianBrowser instance based on the configuration data.
    
    The configuration dictionary is expected to have a 'browser' key with the
    following parameters:

    - headless: whether to run the browser in headless mode.
    - user_data_folder: the folder name for user data.
    - profile_name: the Chrome profile folder name.
    - wait_time: the base timeout (in seconds).
    - retry_times: the number of retry attempts.
    - retry_interval: the seconds between retries.
    
    ```json
    {
        "browser": {
            "headless": True,
            "user_data_folder": "user_data",
            "profile_name": "Profile_1",
            "wait_time": 10,
            "retry_times": 3,
            "retry_interval": 5
        }
    }
    ```
    
    Args:
        config (dict): The configuration data.
        
    Returns:
        QidianBrowser: An instance of QidianBrowser configured with the provided settings.
    """
    browser_config = config.get("browser", {})

    # Get the current working directory to build the absolute path for user_data
    headless = browser_config.get("headless", True)
    user_data_dir = os.path.join(CUR_DIR, browser_config.get("user_data_folder", "user_data"))
    profile_name = browser_config.get("profile_name", "Profile_1")
    wait_time = browser_config.get("wait_time", 10)
    retry_times = browser_config.get("retry_times", 3)
    retry_interval = browser_config.get("retry_interval", 5)

    qd_browser = QidianBrowser(
        user_data_dir=user_data_dir,
        profile_name=profile_name,
        headless=headless,
        wait_time=wait_time,
        retry_times=retry_times,
        retry_interval=retry_interval
    )

    if not login:
        return qd_browser
    
    # Check if manual login was required during the previous run.
    if get_manual_login_flag():
        # If manual login is needed, perform the manual login process.
        if qd_browser.manual_login():
            # Reset the manual login state after a successful login.
            set_manual_login_flag(False)
        else:
            log_message("[X] Manual login failed, please check and try again.", level="warning")
            return None
    else:
        # Attempt automatic login.
        if not qd_browser.login():
            log_message("[X] Automatic login in headless mode failed. Please use manual login.", level="warning")
            set_manual_login_flag(True)
            return None
    return qd_browser

def load_qd_book_parser(config: dict, html_str: str = "", book_id: str = "") -> QidianBookParser:
    """
    Create a QidianBookParser instance based on configuration settings and an optional HTML string.

    The configuration dictionary should include:
    
    - "book": a dictionary that may contain:
        - local_cache_dir: the path to the local cache directory for storing HTML.
    - "content_handling": a dictionary that may include:
        - save_html: a boolean flag indicating whether to save the raw HTML content.

    Args:
        config (dict): The configuration settings for the book parser.
        html_str (str, optional): The HTML content to be parsed. Defaults to an empty string.

    Returns:
        QidianBookParser: An instance of QidianBookParser configured with the provided settings.
    """
    book_config = config.get("book", {})
    content_handling_config = config.get("content_handling", {})

    cache_dir = book_config.get("local_cache_dir", "./local_cache/")
    save_html = content_handling_config.get("save_html", True)

    return QidianBookParser(
        html_str=html_str,
        book_id=book_id,
        save_html=save_html,
        local_cache_dir=cache_dir
    )

def load_qd_chapter_parser(config: dict, html_str: str = "", book_id: str = "") -> QidianChapterParser:
    """
    Create a QidianChapterParser instance using the specified configuration and HTML content.

    The configuration dictionary should include:
    
    - "book": a dictionary that may contain:
        - local_cache_dir: the path to the local cache directory used for caching parsed data.
    - "content_handling": a dictionary that may include:
        - save_html: a boolean flag indicating whether to save the raw HTML content.
    
    Args:
        config (dict): The configuration settings for the chapter parser.
        html_str (str, optional): The HTML content to be parsed. Defaults to an empty string.
    
    Returns:
        QidianChapterParser: An instance of QidianChapterParser configured with the provided settings.
    """
    book_config = config.get("book", {})
    content_handling_config = config.get("content_handling", {})

    cache_dir = book_config.get("local_cache_dir", "./local_cache/")
    save_html = content_handling_config.get("save_html", True)

    return QidianChapterParser(
        html_str=html_str,
        book_id=book_id,
        save_html=save_html,
        local_cache_dir=cache_dir
    )

def load_qd_encrypted_chapter_parser(config: dict, html_str: str = "", book_id: str = ""):
    """
    Create a QidianEncryptedChapterParser instance based on configuration settings and an optional HTML string.

    The configuration dictionary is expected to contain:
    
    - "book": a dictionary that may include:
        - local_cache_dir: the path to the local cache directory for storing parsed data.
    - "content_handling": a dictionary that may include:
        - save_html: a boolean flag indicating whether to save the raw HTML content.
        - use_freq: a boolean flag indicating whether to use frequency-based heuristics (default is True).
        - use_ocr: a boolean flag indicating whether to enable OCR functionality (default is False).
    
    Args:
        config (dict): The configuration data for the encrypted chapter parser.
        html_str (str, optional): The HTML content to be parsed. Defaults to an empty string.
    
    Returns:
        QidianEncryptedChapterParser: An instance configured according to the provided settings.
    """
    from .novel_parser.qidian_encrypted import QidianEncryptedChapterParser

    book_config = config.get("book", {})
    content_handling_config = config.get("content_handling", {})

    cache_dir = book_config.get("local_cache_dir", "./local_cache/")
    save_html = content_handling_config.get("save_html", True)
    use_freq = content_handling_config.get("use_freq", True)
    use_ocr = content_handling_config.get("use_ocr", False)

    return QidianEncryptedChapterParser(
        html_str=html_str,
        book_id=book_id,
        save_html=save_html,
        local_cache_dir=cache_dir,
        use_freq=use_freq,
        use_ocr=use_ocr
    )
