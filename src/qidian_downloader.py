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

from .browser.qidian_browser import QidianBrowser
from .config_loader import load_qd_book_parser, load_qd_chapter_parser, load_qd_encrypted_chapter_parser
from .utils import time_utils, file_saver
from .utils.logger import log_message

def get_book_chapter_str(qd_browser: QidianBrowser, book_id: str, chapter_id: str, config: dict,
                         wait_time: int=5, retry_count: int=3) -> str:
    """
    获取当前章节的 HTML, 再通过 html_parser 解析
    """
    # content_handling_config = config.get("content_handling", {})
    # decode_font = content_handling_config.get("decode_font", False)

    for attempt in range(1, retry_count + 1):
        html_str = qd_browser.get_book_chapter(book_id, chapter_id, wait_time)
        qd_chapter_parser = load_qd_chapter_parser(config, html_str=html_str, book_id=book_id)
        if qd_chapter_parser.is_vip():
            log_message(f"[X] Current chapter ({chapter_id}) is VIP chapter, skipping")
            return ""
        if qd_chapter_parser.is_encrypted():
            log_message("[!] Curreny content: r-font-encrypt")
            # if not decode_font:
            #     return ""
            # else:
            #     qd_chapter_parser = load_qd_encrypted_chapter_parser(config, html_str=html_str)
            return ""

        book_chapter = qd_chapter_parser.get_content(chapter_id)
        if book_chapter:  # not None and not empty
            return book_chapter

        log_message(f"[!] Retry {attempt}/{retry_count}: Failed to get valid chapter content for {chapter_id}", level="warning")
        time_utils.sleep_random_range(wait_time, 1.0)

    # Final failure log after all retries
    return ""

def download_qd_novel(qd_browser: QidianBrowser, book_id: str, config: dict) -> None:
    """
    根据 book_id 下载起点网站的小说
    1. 获取小说的目录 (menu) 并保存为 JSON 文件
    2. 遍历每个章节, 保存为 txt 文件
    """
    book_id = str(book_id)
    book_config = config.get("book", {})
    
    book_wait_time = book_config.get("wait_time", 10)
    save_path = book_config.get("save_path", "./qidian/")

    target_path = os.path.join(save_path, book_id)
    os.makedirs(target_path, exist_ok=True)
    book_info_path = os.path.join(target_path, "book_info.json")
    book_chapter_dir = os.path.join(target_path, "chapters")
    os.makedirs(book_chapter_dir, exist_ok=True)

    book_info = None

    try:
        if os.path.exists(book_info_path):
            book_info = json.load(open(book_info_path, 'r', encoding='utf-8'))
            update_time = book_info.get("update_time")
            diff_days, diff_hours, diff_minutes, diff_seconds = time_utils.calculate_time_difference(update_time, 'UTC+8')
            log_message(f"[!] Book info was last updated {int(diff_days)} days, {int(diff_hours)} hours, {int(diff_minutes)} minutes, and {int(diff_seconds)} seconds ago.")
            if diff_days > 1:
                book_info = None
        if not book_info:
            book_info_html = qd_browser.get_book_info(book_id, book_wait_time)
            book_info = load_qd_book_parser(config=config, html_str=book_info_html).get_book_info()
            if book_info.get("book_name") != "未找到书名" and book_info.get("update_time") != "未找到更新时间":
                file_saver.save_as_json(book_info, book_info_path, overwrite=True)
    except Exception as e:
        log_message(f"[X] Fail to parse book info: {e}", level="warning")
        return

    volume_list = book_info.get("volumes", [])
    for volume in volume_list:
        volume_name = volume.get("volume_name", "")
        log_message(f"[>] Processing volnme: {volume_name}")
        curr_chapters = volume.get("chapters", [])
        for chapter in curr_chapters:
            chapter_id = chapter.get("chapterId")
            if not chapter_id:
                log_message(f"Not find 'chapterId' for: {chapter} with {chapter_id}")
                continue

            chapter_name = chapter.get("title", "")
            chapter_path = os.path.join(book_chapter_dir, f"{chapter_id}.txt")
            if os.path.exists(chapter_path):
                log_message(f"[!] Skipping chapter: {chapter_name} ({chapter_id})")
                continue

            log_message(f"[>] Processing chapter: {chapter_name} ({chapter_id})")
            chapter_str = get_book_chapter_str(qd_browser, book_id, chapter_id, config)
            if not chapter_str:
                log_message(f"[X] Fail to get chapter: {chapter_name} ({chapter_id})", level="warning")
                continue
            file_saver.save_as_txt(chapter_str, chapter_path)
    return
