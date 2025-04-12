#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Main entry point for the Qidian downloader application.
"""

import os
import time
import argparse

from src.config_loader import load_config, load_qd_browser
from src.qd_txt_saver import qd_save_as_txt
# from src.qidian_downloader import download_qd_novel
from src.qidian_downloader_v2 import download_qd_novel_mp
from src.utils import logger

def main():
    parser = argparse.ArgumentParser(description="起点小说下载器")
    parser.add_argument(
        "--config", 
        type=str, 
        default=os.path.join("config", "sample_settings.yaml"), 
        help="配置文件路径, 默认为 config/sample_settings.yaml"
    )
    parser.add_argument(
        "--book-id",
        type=str,
        nargs="+",
        help="指定下载的小说 book_id, 可输入多个, 优先于 config 中的 book_ids"
    )
    args = parser.parse_args()

    logger.setup_logging("qidian_downloader")

    # Define the configuration file path (relative to the project root, placed in the 'config' folder).
    config_path = args.config
    config = load_config(config_path)
    
    book_config = config.get("book", {})
    output_options_config = config.get("output_options", {})
    make_txt = output_options_config.get("make_txt", False)
    make_epub = output_options_config.get("make_epub", False)
    
    if args.book_id:
        book_ids = args.book_id
    else:
        book_ids = book_config.get("book_ids", [])

    if not book_ids:
        logger.log_message("[MAIN] 未提供有效的 book_id, 程序结束", level="warning")
        return

    # Create a QidianBrowser instance based on the configuration data.
    qd_browser = load_qd_browser(config, login=True)
    if not qd_browser:
        logger.log_message("[MAIN] QidianBrowser 初始化失败", level="warning")
        return

    for book_id in book_ids:
        # download_qd_novel(qd_browser, book_id, config=config)
        download_qd_novel_mp(qd_browser, book_id, config=config)
        if make_txt:
            qd_save_as_txt(book_id=book_id, config=config)

    time.sleep(3)
    input("按回车键结束程序...")
    qd_browser.shutdown()
    return

if __name__ == "__main__":
    main()
