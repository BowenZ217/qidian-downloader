#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
This module defines the QidianBrowser class for interacting with the Qidian website. 
It extends the BaseBrowser by adding methods for logging in and retrieving book information.
"""

import random
import time

from DrissionPage.common import Keys

from .base_browser import BaseBrowser
from ..utils.time_utils import sleep_random_range
from ..utils.logger import log_message

class QidianBrowser(BaseBrowser):
    """
    QidianBrowser provides methods for interacting with Qidian, including user 
    login and obtaining book details. It inherits common functionalities from BaseBrowser.

    Attributes:
        logged_in (bool): Indicates whether the user is currently logged in.
    """

    DEFAULT_SCHEME = 'https:'
    QIDIAN_BASE_URL = 'www.qidian.com'
    QIDIAN_BOOKCASE_URL = f'{DEFAULT_SCHEME}//my.qidian.com/bookcase/'
    QIDIAN_BOOK_INFO_URL_1 = f'{DEFAULT_SCHEME}//www.qidian.com/book'
    QIDIAN_BOOK_INFO_URL_2 = f'{DEFAULT_SCHEME}//book.qidian.com/info'
    QIDIAN_CHAPTER_URL = f'{DEFAULT_SCHEME}//www.qidian.com/chapter'

    def __init__(self, user_data_dir=None, profile_name=None, headless=False,
                 wait_time=10, retry_times=3, retry_interval=5):
        """
        Initializes a new QidianBrowser instance by setting up the underlying 
        browser session and initializing the login status.

        Args:
            user_data_dir (str): Optional; path to user data directory.
            profile_name (str): Optional; Chrome profile directory name.
            headless (bool): Optional; whether to run in headless mode.
            wait_time (int): Optional; base timeout in seconds.
            retry_times (int): Optional; number of retry attempts.
            retry_interval (int): Optional; seconds to wait between retries.
        """
        super().__init__(
            user_data_dir=user_data_dir,
            profile_name=profile_name,
            headless=headless,
            wait_time=wait_time,
            retry_times=retry_times,
            retry_interval=retry_interval
        )
        self._headless = headless
        self._logged_in = False

    def _is_user_logged_in(self):
        """
        Checks whether the user is currently logged in based on the visibility 
        of a specific login element.

        Returns:
            bool: True if the user appears to be logged in, False otherwise.
        """
        try:
            # Locate the sign-in element using its class identifier
            sign_in_elem = self._page.ele("@class=sign-in")
            if sign_in_elem:
                # Retrieve the element's class attribute and check for "hidden"
                class_value = sign_in_elem.attr("class")
                if class_value and "hidden" not in class_value:
                    return True
        except Exception as e:
            # Ensure that log_message is defined in your project or replace it with your logging mechanism.
            log_message(f"[QidianBrowser] Error while checking login status: {e}", level="warning")
        return False

    def login(self, max_retries=3):
        """
        Attempts to log in to Qidian by navigating to the homepage and interacting 
        with the login UI.

        Args:
            max_retries (int): Maximum number of attempts to trigger the login button.

        Returns:
            bool: True if login was successful or already logged in; False otherwise.
        """
        try:
            original_url = self._page.url
            self.get('https://www.qidian.com/')
            retries = 0

            self._page.wait.eles_loaded('#login-box')

            while retries < max_retries:
                # Check for an overlay mask and attempt to close it if present.
                try:
                    mask = self._page.ele("@@tag()=div@@class=mask")
                    if mask:
                        log_message("[QidianBrowser] Overlay mask detected.")
                        # Use get_frame() to retrieve the iframe containing the overlay.
                        login_iframe = self._page.get_frame('loginIfr', timeout=5)
                        if login_iframe:
                            close_btn = login_iframe.ele('@id=close', timeout=5)
                            if close_btn:
                                log_message("[QidianBrowser] Clicking close button for overlay mask in iframe.")
                                close_btn.click()
                            else:
                                log_message("[QidianBrowser] Close button not found in the login iframe.")
                        else:
                            log_message("[QidianBrowser] Login iframe not found for overlay mask.")
                        # Wait after handling the mask.
                        time.sleep(5)
                except Exception as me:
                    log_message(f"[QidianBrowser] Exception encountered checking for overlay mask: {me}")

                # Check login state; if already logged in, exit the loop.
                if self._is_user_logged_in():
                    log_message("[QidianBrowser] Already logged in, exiting login loop.")
                    break

                # Attempt to click the login button.
                try:
                    log_message(f"[QidianBrowser] Not logged in, attempting to click login button (Attempt {retries + 1})...")
                    login_btn = self._page.ele('@id=login-btn', timeout=5)
                    if login_btn:
                        login_btn.click()
                    else:
                        log_message("[QidianBrowser] Login button not found.")
                except Exception as e:
                    log_message(f"[QidianBrowser] Login click failed: {e}")

                time.sleep(5)
                retries += 1

            self._logged_in = self._is_user_logged_in()
            if self._logged_in:
                log_message("[QidianBrowser] Login successful.")
            else:
                log_message("[QidianBrowser] Max retries reached, still not logged in.")

            self._page.get(original_url)
            return self._logged_in

        except Exception as e:
            log_message(f"[QidianBrowser] Login process error: {e}", level="warning")
        return False

    def manual_login(self):
        """
        Provides an interactive manual login process.

        操作步骤：
          1. shutdown 当前浏览器会话 (如果 headless)
          2. 修改配置为非 headless 模式并重新初始化浏览器 (如果 headless)
          3. 导航到 https://www.qidian.com/ 并不断提示用户完成登录
          4. 在检测到用户登录成功后退出循环
          5. shutdown 浏览器会话, 并恢复原 headless 配置, 重新初始化浏览器 (如果 headless)

        Returns:
            bool: True if manual login successfully completed; otherwise False.
        """
        if self._headless:
            # 1. 关闭当前浏览器会话
            self.shutdown()

            # 2. 切换到非 headless 模式进行手动登录
            self._options.headless(False)
            self._setup()

        # 3. 导航到目标页面
        self.get("https://www.qidian.com/")

        # 4. 循环等待用户手动登录成功
        while True:
            self._logged_in = self._is_user_logged_in()
            if self._logged_in:
                log_message("[QidianBrowser] 检测到用户已登录")
                break
            else:
                log_message("[QidianBrowser] 登录状态未检测到, 请确认是否完成登录, 稍后重试")
            input("登录完成后, 请按回车键继续程序...")

        if self._headless:
            # 5. 登录成功后关闭当前的浏览器会话
            self.shutdown()

            # 6. 恢复原来 headless 模式的设置并重新初始化浏览器
            self._options.headless(self._headless)
            self._setup()
            self.login()

        return self._logged_in

    def get_book_info(self, book_id: int, wait_time: int=5) -> str:
        """
        Retrieves information about a book from Qidian based on its identifier.

        Before making the request, this method ensures that the user is logged in.

        Args:
            book_id (int): The identifier of the book to be retrieved.
            wait_time (int): Optional; base wait time before returning content.

        Returns:
            str: The HTML content of book info page.

        Raises:
            Exception: If the user is not logged in.
        """
        if not self._logged_in:
            raise Exception("User not logged in. Please call login() first.")
        
        try:
            url = f'{self.QIDIAN_BOOK_INFO_URL_2}/{book_id}/'
            self.get(url)
            sleep_random_range(wait_time, 3)
            return self._page.html
        except Exception as e:
            log_message(f"[QidianBrowser] Error while fetching book info HTML from '{url}': {e}", level="warning")
        return ""

    def get_book_chapter(self, book_id: str, chapter_id: str, wait_time: int = 5) -> str:
        """
        Retrieves the HTML content of a specific chapter from Qidian.

        Ensures the user is logged in before attempting to fetch the content.

        Args:
            book_id (str): The identifier of the book.
            chapter_id (str): The identifier of the chapter.
            wait_time (int): Optional; base wait time before returning content.

        Returns:
            str: The HTML content of the chapter page.

        Raises:
            Exception: If the user is not logged in.
        """
        if not self._logged_in:
            raise Exception("User not logged in. Please call login() first.")

        url = f'{self.QIDIAN_CHAPTER_URL}/{book_id}/{chapter_id}/'
        try:
            self.get(url)
            # sleep_random_range(wait_time, 3)
            duration = random.uniform(wait_time, wait_time + 5.0)
            for i in range(int(duration * 2)):
                self._page.actions.key_down(Keys.DOWN)
                time.sleep(0.5)
            return self._page.html
        except Exception as e:
            log_message(f"[QidianBrowser] Error while fetching chapter HTML from '{url}': {e}", level="warning")
        return ""

    def get_bookcase(self, wait_time: int = 5) -> str:
        """
        Retrieves the HTML content of the user's Qidian bookcase page.

        Ensures the user is logged in before attempting to fetch the content.

        Args:
            wait_time (int): Optional; base wait time before returning content.

        Returns:
            str: The HTML content of the bookcase page.

        Raises:
            Exception: If the user is not logged in.
        """
        if not self._logged_in:
            raise Exception("User not logged in. Please call login() first.")

        url = self.QIDIAN_BOOKCASE_URL
        try:
            self.get(url)
            sleep_random_range(wait_time, 3)
            return self._page.html
        except Exception as e:
            log_message(f"[QidianBrowser] Error while fetching bookcase HTML from '{url}': {e}", level="warning")
            return ""
