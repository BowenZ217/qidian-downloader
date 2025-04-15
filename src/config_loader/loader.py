#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
This module provides functions for loading configuration data
"""

import yaml

from ..utils.logger import log_message

def load_config(config_path: str) -> dict:
    """
    Load configuration data from a YAML file.
    
    Args:
        config_path (str): The path to the YAML configuration file.
        
    Returns:
        dict: The configuration data.
    """
    try:
        with open(config_path, "r", encoding="utf-8") as f:
            config = yaml.safe_load(f)
        return config if config is not None else {}
    except Exception as e:
        log_message(f"[config loader] Failed to load config from '{config_path}': {e}")
        return {}
