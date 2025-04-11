#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Font Utilities Module

This module provides utility functions for downloading font files from remote URLs.
It ensures that the font is saved locally and avoids redundant downloads by checking
if the file already exists.
"""

from urllib.parse import urlparse, unquote
import os
import requests

from .logger import log_message

def download_font(url: str, folder: str, timeout: int = 10) -> str:
    """
    Downloads a font file from the specified URL and saves it to a local folder.

    If the file already exists in the target folder, the download is skipped.

    Parameters:
        url (str): The URL of the font file to download.
        folder (str): The local directory where the font file should be saved.
        timeout (int, optional): Timeout in seconds for the HTTP request. Defaults to 10.

    Returns:
        str: The full path to the saved font file if successful, otherwise an empty string.
    """
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )
    }
    
    os.makedirs(folder, exist_ok=True)

    # Parse the URL to extract a clean filename (without query parameters or fragments)
    parsed_url = urlparse(url)
    clean_path = unquote(parsed_url.path)
    filename = os.path.basename(clean_path)
    filepath = os.path.join(folder, filename)
    if os.path.exists(filepath):
        log_message(f"[DONE] Font already exists: {filepath}")
        return filepath

    # Try to download the font file
    try:
        response = requests.get(url, headers=headers, stream=True, timeout=timeout)
        response.raise_for_status()  # Raise an exception for HTTP errors

        with open(filepath, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:  # Avoid writing keep-alive chunks
                    f.write(chunk)
        log_message(f"[DONE] Font saved to: {filepath}")
        return filepath
    except requests.RequestException as e:
        log_message(f"[X] Failed to download font: {e}", level="warning")
    except Exception as e:
        log_message(f"[X] Unexpected error: {e}", level="warning")
    return ""
