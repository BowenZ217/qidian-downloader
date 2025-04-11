#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Logging Utilities Module

This module provides custom logging functionalities for the qidian-font-decoder project.
It includes:

- A CustomFormatter class that dynamically adjusts the log format to reduce redundant context information
  in consecutive log entries.
- A setup_logging function to configure the logger with both a file handler and a console handler.
- A log_message utility function to log messages uniformly using the configured logger.

Logs are stored in a "logs" directory with filenames that include the current date. If the logger is not
initialized, log_message will fall back to printing messages to the console.
"""

import logging
import os
import time
from datetime import datetime

LOGGER = None

class CustomFormatter(logging.Formatter):
    def __init__(self, fmt, datefmt=None, style='%'):
        super().__init__(fmt=fmt, datefmt=datefmt, style=style)
        self.last_log_time = None
        self.last_name = ""
        self.last_levelname = ""
        self.original_fmt = fmt
        self.simple_fmt = "%(message)s"

    def format(self, record):
        current_log_time = time.strftime("%Y-%m-%d %H:%M", time.localtime(record.created))
        if (
            current_log_time == self.last_log_time and
            record.levelname == self.last_levelname and
            record.name == self.last_name
        ):
            self._style._fmt = self.simple_fmt
        else:
            self._style._fmt = self.original_fmt
            self.last_log_time = current_log_time
            self.last_name = record.name
            self.last_levelname = record.levelname
        return super().format(record)

def setup_logging(log_name=""):
    """
    Sets up a logger.

    This function creates a logs directory if it doesn't exist, configures the logger
    with a file handler and a console handler, and returns the logger instance.
    
    Subsequent logging can be done via the returned logger or a custom `log_message` function.
    """
    global LOGGER
    logs_directory = "logs"
    if not os.path.exists(logs_directory):
        os.makedirs(logs_directory)

    if not log_name:
        log_name = __name__

    LOGGER = logging.getLogger(log_name)
    LOGGER.setLevel(logging.INFO)

    # format as "YYYY-MM-DD"
    current_date = datetime.now().strftime("%Y-%m-%d")
    
    # Create a file handler
    log_filename = f"{log_name}_{current_date}.log"
    handler = logging.FileHandler(os.path.join(logs_directory, log_filename), encoding="utf-8")
    
    # Create a console handler
    console = logging.StreamHandler()
    # console.setLevel(logging.INFO)
    console.setLevel(logging.WARNING)

    # Define a formatter and set it for both handlers
    full_format = '%(asctime)s - %(name)s - %(levelname)s:\n%(message)s'
    date_format = "%Y-%m-%d %H:%M:%S"
    custom_formatter = CustomFormatter(full_format, date_format)
    handler.setFormatter(custom_formatter)
    console.setFormatter(custom_formatter)
    
    # Clear any existing handlers to prevent duplicate logs
    if LOGGER.hasHandlers():
        LOGGER.handlers.clear()

    # Add handlers to the logger
    LOGGER.addHandler(handler)
    LOGGER.addHandler(console)
    LOGGER.propagate = False

    return LOGGER

def log_message(*args, level="info"):
    """
    Logs a message using `logger` if logger is set, otherwise uses print.
    
    Accepts any number of arguments, converts them to strings, and joins them with a space.
    """
    # Convert all arguments to strings (if they are not already) and join them with a space
    message = ' '.join(str(arg) for arg in args)
    
    if LOGGER is not None:
        log_func = {
            "info": LOGGER.info,
            "debug": LOGGER.debug,
            "warning": LOGGER.warning,
            "error": LOGGER.error,
        }.get(level, LOGGER.info)
        log_func(message)
    else:
        print(message)
    return
