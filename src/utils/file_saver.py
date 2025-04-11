#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
This module provides utility functions for saving data to files in two common formats: plain text and JSON.

It includes the following functions:
    - save_as_txt(content, filename, encoding='utf-8'):
        Saves the given string content to a text file.
    - save_as_json(content, filename, encoding='utf-8'):
        Saves the given data (e.g., dictionary, list) to a JSON file with proper formatting.

Usage Example:

```python
from file_saver import save_as_txt, save_as_json

# Save a text string to a file
text_content = "Hello, world!"
save_as_txt(text_content, "hello.txt")

# Save a dictionary as a JSON file
json_content = {"greeting": "Hello", "subject": "world"}
save_as_json(json_content, "hello.json")
```
"""

import os
import re
import json

from .logger import log_message

def sanitize_filename(filename: str) -> str:
    """
    Sanitize the given filename by replacing characters that are invalid in file paths with '_'.

    This function checks the operating system environment and applies the appropriate
    filtering rules:
      - On Windows, it replaces characters: <>:"/\\|?*
      - On POSIX systems, it replaces the forward slash '/'
    
    Parameters:
        filename (str): The input filename to sanitize.
    
    Returns:
        str: The sanitized filename.
    """
    if os.name == 'nt':
        # Windows: invalid characters in filenames are: <>:"/\\|?*
        pattern = r'[<>:"/\\|?*]'
    else:
        # POSIX systems: the forward slash is not allowed
        pattern = r'[/]'
    
    sanitized_filename = re.sub(pattern, '_', filename)
    return sanitized_filename

def save_as_txt(content, filepath, encoding='utf-8', overwrite=False):
    """
    Save the given content to a text file.

    Parameters:
        content (str): The text content to be saved.
        filepath (str): The target file path (including directory and filename).
        encoding (str): File encoding, default is 'utf-8'.
        overwrite (bool): If True, overwrite the file if it exists;
                          otherwise, skip saving. Default is False.
    """
    try:
        # Split the path into directory and basename
        directory, filename = os.path.split(filepath)
        if directory:
            os.makedirs(directory, exist_ok=True)
        
        # Sanitize the filename
        filename = sanitize_filename(filename)
        filepath = os.path.join(directory, filename)

        # Check if file exists.
        if os.path.exists(filepath):
            log_message(f"[!] File already exists at {filepath}.")
            if not overwrite:
                log_message(f"[SKIP] File exists. Skipping save operation.")
                return
            else:
                log_message(f"[OVERWRITE] Overwriting existing file at {filepath}.")

        with open(filepath, 'w', encoding=encoding) as f:
            f.write(content)
        log_message(f"[DONE] Text saved to {filepath}")
    except Exception as e:
        log_message(f"[X] Error saving text file: {e}", level="warning")
    return

def save_as_json(content, filepath, encoding='utf-8', overwrite=False):
    """
    Save the given content as a JSON file.

    Parameters:
        content (Any): The data to be saved as JSON.
        filepath (str): The target file path (including directory and filename).
        encoding (str): File encoding, default is 'utf-8'.
        overwrite (bool): If True, overwrite the file if it exists;
                          otherwise, skip saving. Default is False.
    """
    try:
        # Split the path into directory and basename
        directory, filename = os.path.split(filepath)
        if directory:
            os.makedirs(directory, exist_ok=True)
        
        # Sanitize the filename
        filename = sanitize_filename(filename)
        filepath = os.path.join(directory, filename)

        # Check if file exists.
        if os.path.exists(filepath):
            log_message(f"[!] File already exists at {filepath}.")
            if not overwrite:
                log_message(f"[SKIP] File exists. Skipping save operation.")
                return
            else:
                log_message(f"[OVERWRITE] Overwriting existing file at {filepath}.")
        
        with open(filepath, 'w', encoding=encoding) as f:
            json.dump(content, f, ensure_ascii=False, indent=2)
        log_message(f"[DONE] JSON saved to {filepath}")
    except Exception as e:
        log_message(f"[X] Error saving JSON file: {e}", level="warning")
    return
