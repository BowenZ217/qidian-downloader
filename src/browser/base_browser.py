#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
This module defines the BaseBrowser class, which provides common functionalities 
for browser operations. Derived classes can extend these methods for 
specialized purposes.
"""

from DrissionPage import ChromiumOptions, Chromium

class BaseBrowser:
    """
    BaseBrowser wraps basic browser operations using DrissionPage,
    with full control over browser configuration, session profile, 
    retry and timeout behavior.

    Attributes:
        _options (ChromiumOptions): Configuration object for Chromium.
        _browser (Chromium): Chromium instance.
        _page (ChromiumPage): The active browser tab.
    """

    def __init__(self, user_data_dir=None, profile_name=None, headless=False,
                 wait_time=10, retry_times=3, retry_interval=5):
        """
        Initialize the browser with specified options.

        Args:
            user_data_dir (str): Optional; path to user data directory.
            profile_name (str): Optional; Chrome profile directory name.
            headless (bool): Optional; whether to run in headless mode.
            wait_time (int): Optional; base timeout in seconds.
            retry_times (int): Optional; number of retry attempts.
            retry_interval (int): Optional; seconds to wait between retries.
        """
        self._options = ChromiumOptions()
        if user_data_dir:
            self._options.set_user_data_path(user_data_dir)
        if profile_name:
            self._options.set_user(profile_name)
        self._options.headless(headless)
        self._options.set_user_agent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
        )
        self._options.set_timeouts(base=wait_time)
        self._options.set_retry(times=retry_times, interval=retry_interval)

        # self._options.set_argument('--disable-blink-features', 'AutomationControlled')
        # self._options.set_argument('--log-level', '3')
        # self._options.set_argument('--disable-gpu')
        # self._options.set_argument('no-sandbox')

        self._setup()

    def _setup(self):
        """
        Set up the browser options and initialize the browser with the given parameters.
        """
        self._browser = Chromium(self._options)
        self._page = self._browser.get_tab()

    def get(self, url: str):
        """
        Navigate to the given URL.

        Args:
            url (str): The URL to be loaded.
        """
        self._page.get(url)

    @property
    def page(self):
        """Return the current page object"""
        return self._page

    @property
    def browser(self):
        """Return the Chromium browser instance"""
        return self._browser

    @property
    def options(self):
        """Return the ChromiumOptions configuration object"""
        return self._options

    def shutdown(self):
        """
        Shutdown the browser session.

        This method quits the browser and cleans up resources.
        """
        if self._browser:
            self._browser.quit()
            self._browser = None
            self._page = None

    def __getstate__(self):
        state = self.__dict__.copy()
        state.pop('_browser', None)
        state.pop('_page', None)
        return state

    def __setstate__(self, state):
        self.__dict__.update(state)
        self._setup()
