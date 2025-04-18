#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
This module defines the BaseSession class, which provides basic HTTP 
request capabilities using the requests library. It maintains a 
persistent session and supports retries, headers, and timeout configurations.
"""

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

class BaseSession:
    """
    BaseSession wraps basic HTTP operations using requests.Session,
    supporting retry logic, timeout, and persistent connections.

    Attributes:
        _session (requests.Session): The persistent HTTP session.
        _timeout (int): Timeout for each request in seconds.
        _adapter (HTTPAdapter): HTTPAdapter with retry strategy.
    """

    def __init__(self, headers=None, timeout=10, retry_times=3, backoff_factor=0.3):
        """
        Initialize the session with optional headers and retry strategy.

        Args:
            headers (dict): Optional; default headers for all requests.
            timeout (int): Timeout in seconds for requests.
            retry_times (int): Number of retry attempts on failure.
            backoff_factor (float): Backoff factor between retry attempts.
        """
        self._headers = headers or {}
        self._timeout = timeout
        self._retry_times = retry_times
        self._backoff_factor = backoff_factor

        self._session = None
        self._adapter = None

        self._setup()

    def _setup(self):
        """
        Setup the session with retry strategy and default headers.
        """
        self._session = requests.Session()

        retry_strategy = Retry(
            total=self._retry_times,
            backoff_factor=self._backoff_factor,
            status_forcelist=[429, 500, 502, 503, 504],
            allowed_methods=["HEAD", "GET", "OPTIONS", "POST"]
        )

        self._adapter = HTTPAdapter(max_retries=retry_strategy)
        self._session.mount("http://", self._adapter)
        self._session.mount("https://", self._adapter)

        if self._headers:
            self._session.headers.update(self._headers)

    def get(self, url, params=None, **kwargs):
        """
        Send a GET request.

        Args:
            url (str): The target URL.
            params (dict): Query parameters.
            **kwargs: Additional arguments passed to requests.

        Returns:
            Response object.
        """
        return self._session.get(url, params=params, timeout=self._timeout, **kwargs)

    def post(self, url, data=None, json=None, **kwargs):
        """
        Send a POST request.

        Args:
            url (str): The target URL.
            data (dict or bytes): Form data.
            json (dict): JSON body.
            **kwargs: Additional arguments passed to requests.

        Returns:
            Response object.
        """
        return self._session.post(url, data=data, json=json, timeout=self._timeout, **kwargs)

    @property
    def session(self):
        """Return the requests.Session instance."""
        return self._session

    @property
    def timeout(self):
        """Return the default timeout setting."""
        return self._timeout

    @property
    def headers(self):
        """Return the default headers."""
        return self._session.headers if self._session else {}

    @property
    def adapter(self):
        """Return the configured HTTPAdapter."""
        return self._adapter

    def shutdown(self):
        """
        Shutdown the HTTP session.

        This method closes the session and releases resources.
        """
        if self._session:
            self._session.close()
            self._session = None
            self._adapter = None
