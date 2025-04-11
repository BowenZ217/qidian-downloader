#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Main entry point for the Qidian downloader application.
"""

import os
import time

from src.config_loader import load_config, load_qd_browser
from src.qd_txt_saver import qd_save_as_txt
# from src.qidian_downloader import download_qd_novel
from src.qidian_downloader_v2 import download_qd_novel_mp
from src.utils import logger
from src.utils.state_manager import get_manual_login_flag, set_manual_login_flag

def main():
    logger.setup_logging("qidian_downloader")

    # Define the configuration file path (relative to the project root, placed in the 'config' folder).
    config_path = os.path.join("config", "settings.yaml")
    config = load_config(config_path)
    
    book_config = config.get("book", {})
    output_options_config = config.get("output_options", {})
    book_ids = book_config.get("book_ids")
    make_txt = output_options_config.get("make_txt", False)
    make_epub = output_options_config.get("make_epub", False)

    # Create a QidianBrowser instance based on the configuration data.
    qd_browser = load_qd_browser(config)
    
    # Check if manual login was required during the previous run.
    if get_manual_login_flag():
        # If manual login is needed, perform the manual login process.
        if qd_browser.manual_login():
            # Reset the manual login state after a successful login.
            set_manual_login_flag(False)
        else:
            logger.log_message("[X] Manual login failed, please check and try again.", level="warning")
            return
    else:
        # Attempt automatic login.
        if not qd_browser.login():
            logger.log_message("[X] Automatic login in headless mode failed. Please use manual login.", level="warning")
            set_manual_login_flag(True)
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
