#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Qidian Novel Downloader Module

This module provides functionality for scraping and downloading novel data from the Qidian website.
It includes functions to:
- Download an entire novel by saving its metadata as a JSON file and each chapter as a text file (download_qd_novel).
"""

import json
import os
import multiprocessing as mp

from .browser.qidian_browser import QidianBrowser
from .config_loader import load_qd_book_parser, load_qd_chapter_parser, load_qd_encrypted_chapter_parser
from .utils import time_utils, file_saver
from .utils.logger import log_message, setup_logging

MAX_FETCH_QUEUE_SIZE = 50
MAX_RETRIES = 3

def fetcher(fetch_queue: mp.Queue, parse_queue: mp.Queue,
            qd_browser: QidianBrowser, book_id: str, wait_time: int):
    """
    Process function for fetching chapter HTML.

    It pulls chapter tasks from fetch_queue, uses get_book_chapter_str to fetch HTML,
    and then pushes a tuple (chapter_info, chapter_html) to parse_queue.
    When a None value is received, this process terminates after pushing a sentinel to parse_queue.

    Args:
        fetch_queue (mp.Queue): Queue of chapter tasks (each task is a chapter dict).
        parse_queue (mp.Queue): Queue for fetched chapter results.
        qd_browser (QidianBrowser): Browser instance for fetching chapter HTML.
        book_id (str): Identifier of the book.
        wait_time (int): Base wait time.
        retry_count (int): Number of retries for fetching.
    """
    setup_logging("qidian_fetcher")
    while True:
        chapter = fetch_queue.get()  # blocking call
        if chapter is None:
            # No more tasks—send sentinel to parser queue and exit.
            parse_queue.put(None)
            break

        chapter_id = chapter.get("chapterId")
        chapter_title = chapter.get("title", "")
        if not chapter_id:
            log_message(f"[Fetcher] Missing chapterId in: {chapter}", level="warning")
            continue

        log_message(f"[Fetcher] Fetching chapter: {chapter_title} ({chapter_id})")
        chapter_html = qd_browser.get_book_chapter(book_id, chapter_id, wait_time)
        parse_queue.put((chapter, chapter_html))

def parser_saver(parse_queue: mp.Queue, fetch_queue: mp.Queue, encrypted_parse_queue: mp.Queue,
                 config: dict, book_id: str, chapter_dir: str):
    """
    Process function for parsing HTML and saving chapter text.

    It continually reads from parse_queue, instantiates a chapter parser,
    and saves the chapter text as a .txt file if the chapter is valid.
    When a None value is received, it terminates.

    Args:
        parse_queue (mp.Queue): Queue containing tuples (chapter, chapter_html).
        config (dict): Configuration dictionary for parsers.
        book_id (str): Book identifier (could be used to further initialize parsers).
        chapter_dir (str): Directory where chapter text files will be saved.
    """
    setup_logging("qidian_parser_saver")
    content_handling_config = config.get("content_handling", {})
    decode_font = content_handling_config.get("decode_font", False)

    while True:
        item = parse_queue.get()
        if item is None:
            break

        chapter, chapter_html = item
        chapter_id = chapter.get("chapterId")
        chapter_title = chapter.get("title", "")
        
        # Initialize chapter parser with the fetched HTML.
        qd_chapter_parser = load_qd_chapter_parser(config, html_str=chapter_html, book_id=book_id)
        # Skip if the chapter is VIP or encrypted.
        if qd_chapter_parser.is_vip():
            log_message(f"[Parser] Skipping VIP chapter: {chapter_title} ({chapter_id})")
            continue
        if qd_chapter_parser.is_encrypted():
            if not decode_font:
                log_message(f"[Parser] Skipping encrypted chapter: {chapter_title} ({chapter_id})")
            else:
                log_message(f"[Parser] Try parse encrypted chapter: {chapter_title} ({chapter_id})")
                if encrypted_parse_queue is not None:
                    encrypted_parse_queue.put((chapter, chapter_html))
            continue

        chapter_text = qd_chapter_parser.get_content(chapter_id)
        if not chapter_text:
            log_message(f"[Parser] Failed to parse chapter: {chapter_title} ({chapter_id})", level="warning")
            retries = chapter.get("retries", 0)
            if retries < MAX_RETRIES:
                chapter["retries"] = retries + 1
                log_message(f"[Parser] Failed to parse chapter: {chapter_title} ({chapter_id}), retry: {chapter['retries']}/{MAX_RETRIES}", level="warning")
                fetch_queue.put(chapter)
            else:
                log_message(f"[Parser] Failed to parse chapter: {chapter_title} ({chapter_id}), exceeded the upper retries limit", level="warning")
            continue

        chapter_path = os.path.join(chapter_dir, f"{chapter_id}.txt")
        file_saver.save_as_txt(chapter_text, chapter_path)
        log_message(f"[Parser] Successfully saved chapter: {chapter_title} ({chapter_id})")

def encrypted_parser_saver(encrypted_parse_queue: mp.Queue, fetch_queue: mp.Queue, 
                           config: dict, book_id: str, chapter_dir: str):
    """
    Encrypted Parser Saver process: Uses OCR-based parser for encrypted chapters.
    """
    setup_logging("qidian_encrypted_parser")
    while True:
        item = encrypted_parse_queue.get()  # Blocking call
        if item is None:
            break

        chapter, chapter_html = item
        chapter_id = chapter.get("chapterId")
        chapter_title = chapter.get("title", "")

        # Use the OCR-based parser for encrypted chapters.
        qd_chapter_parser = load_qd_encrypted_chapter_parser(config, html_str=chapter_html, book_id=book_id)
        chapter_text = qd_chapter_parser.get_content(chapter_id)
        if not chapter_text:
            log_message(f"[Encrypted Parser] Failed to parse chapter: {chapter_title} ({chapter_id})", level="warning")
            retries = chapter.get("retries", 0)
            if retries < MAX_RETRIES:
                chapter["retries"] = retries + 1
                log_message(f"[Encrypted Parser] Retrying chapter: {chapter_title} ({chapter_id}), retry: {chapter['retries']}/{MAX_RETRIES}", level="warning")
                fetch_queue.put(chapter)
            else:
                log_message(f"[Encrypted Parser] Failed chapter after maximum retries: {chapter_title} ({chapter_id})", level="warning")
            continue

        chapter_path = os.path.join(chapter_dir, f"{chapter_id}.txt")
        file_saver.save_as_txt(chapter_text, chapter_path)
        log_message(f"[Encrypted Parser] Successfully saved chapter: {chapter_title} ({chapter_id})")

def download_qd_novel_mp(qd_browser: QidianBrowser, book_id: str, config: dict) -> None:
    """
    Download a Qidian novel using multiprocessing to fetch, parse, and save chapters concurrently.

    This function performs the following steps:
    1. Loads or fetches the book information and menu, then extracts chapter data.
    2. Sets up a multiprocessing Queue and two processes: one as a fetcher, the other as a parser and saver.
    3. The fetcher retrieves chapter HTML strings and queues them.
    4. The parser-saver takes the queued data, processes it, and saves it as text files.
    
    Args:
        qd_browser (QidianBrowser): The browser instance to use for fetching.
        book_id (str): The identifier for the book.
        config (dict): A dictionary containing configuration for fetching and parsing.
    
    Returns:
        None
    """
    book_id = str(book_id)
    book_config = config.get("book", {})
    content_handling_config = config.get("content_handling", {})
    
    wait_time = book_config.get("wait_time", 10)
    save_path = book_config.get("save_path", "./qidian/")
    decode_font = content_handling_config.get("decode_font", False)

    target_path = os.path.join(save_path, book_id)
    os.makedirs(target_path, exist_ok=True)
    book_info_path = os.path.join(target_path, "book_info.json")
    chapter_dir = os.path.join(target_path, "chapters")
    os.makedirs(chapter_dir, exist_ok=True)

    book_info = None

    # Load or update book information
    try:
        if os.path.exists(book_info_path):
            book_info = json.load(open(book_info_path, 'r', encoding='utf-8'))
            update_time = book_info.get("update_time")
            diff_days, diff_hours, diff_minutes, diff_seconds = time_utils.calculate_time_difference(update_time, 'UTC+8')
            log_message(f"[!] Book info was last updated {int(diff_days)} days, {int(diff_hours)} hours, {int(diff_minutes)} minutes, and {int(diff_seconds)} seconds ago.")
            if diff_days > 1:
                book_info = None
        if not book_info:
            book_info_html = qd_browser.get_book_info(book_id, wait_time)
            book_info = load_qd_book_parser(config=config, html_str=book_info_html).get_book_info()
            # Save book info if it seems valid
            if book_info.get("book_name") != "未找到书名" and book_info.get("update_time") != "未找到更新时间":
                file_saver.save_as_json(book_info, book_info_path, overwrite=True)
    except Exception as e:
        log_message(f"[Main] Failed to load or parse book info: {e}", level="warning")
        return

    volume_list = book_info.get("volumes", [])
    
    # Initialize queues before iterating over volumes.
    fetch_queue = mp.Queue(maxsize=MAX_FETCH_QUEUE_SIZE)
    parse_queue = mp.Queue()
    encrypted_parse_queue = None
    p_encrypted_parser = None

    if decode_font:
        encrypted_parse_queue = mp.Queue()
        p_encrypted_parser = mp.Process(target=encrypted_parser_saver, args=(encrypted_parse_queue, fetch_queue, config, book_id, chapter_dir))
        p_encrypted_parser.start()

    # Create fetcher and parser processes.
    p_fetcher = mp.Process(target=fetcher, args=(fetch_queue, parse_queue, qd_browser, book_id, wait_time))
    p_parser = mp.Process(target=parser_saver, args=(parse_queue, fetch_queue, encrypted_parse_queue, config, book_id, chapter_dir))

    p_fetcher.start()
    p_parser.start()

    # Push each chapter task into the fetch_queue.
    for volume in volume_list:
        volume_name = volume.get("volume_name", "")
        log_message(f"[Main] Processing volume: {volume_name}")
        curr_chapters = volume.get("chapters", [])
        for chapter in curr_chapters:
            chapter_id = chapter.get("chapterId")
            if not chapter_id:
                log_message(f"[Main] Skipping chapter without chapterId: {chapter}", level="warning")
                continue
            chapter_path = os.path.join(chapter_dir, f"{chapter_id}.txt")
            if os.path.exists(chapter_path):
                log_message(f"[Main] Skipping already saved chapter: {chapter.get('title', '')} ({chapter_id})")
                continue
            log_message(f"[Main] Add chapter: {chapter.get('title', '')} ({chapter_id})")
            fetch_queue.put(chapter)

    # After enqueuing all chapter tasks, push sentinel to signal termination.
    fetch_queue.put(None)

    p_fetcher.join()
    p_parser.join()

    # If Decode is enabled, signal termination and wait.
    if decode_font:
        encrypted_parse_queue.put(None)
        p_encrypted_parser.join()

    log_message("[Main] Novel download completed.")
    return
