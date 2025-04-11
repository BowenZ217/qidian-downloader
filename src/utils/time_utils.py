#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Time Utilities Module

This module provides helpful functions for working with time-related operations,
including timezone-aware datetime calculations and random delays.

Functions:
    - calculate_time_difference(from_time_str, tz_str, to_time_str, to_tz_str):
        Calculates the difference between two datetime values (specified as strings in
        the format "YYYY-MM-DD HH:MM:SS") in a timezone-aware manner. The "from" datetime
        is compared with the "to" datetime. If the "to" datetime is not provided, the
        current time (in UTC) is used by default. Both timezones are specified using a
        "UTC" notation (e.g., "UTC+8", "UTC-5").

    - sleep_random_range(base, spread):
        Introduces a random delay between "base" and "base + spread" seconds. This is useful
        for simulating human-like pauses in automation tasks or avoiding rate-limiting when
        interacting with APIs.
"""

import time
import random
from datetime import datetime, timedelta, timezone

from .logger import log_message

def calculate_time_difference(from_time_str: str, 
                              tz_str: str = "UTC", 
                              to_time_str: str = None, 
                              to_tz_str: str = "UTC"):
    """
    Calculates the time difference between two datetime values.
    
    The first datetime value is provided as 'from_time_str' with its timezone 'tz_str',
    and the second datetime can be provided as 'to_time_str' with its timezone 'to_tz_str'.
    If 'to_time_str' is not provided, the current time is used.
    
    Args:
        from_time_str (str): A datetime string in the format "YYYY-MM-DD HH:MM:SS"
                             representing the starting time.
        tz_str (str): The timezone string for from_time_str in the format 'UTC+8', 'UTC-5', etc.
                      Default is 'UTC'.
        to_time_str (str, optional): A datetime string in the format "YYYY-MM-DD HH:MM:SS"
                                     representing the ending time. If not provided, defaults to now.
        to_tz_str (str): The timezone string for to_time_str in the format 'UTC+8', 'UTC-5', etc.
                         Default is 'UTC'.
    
    Returns:
        tuple: A tuple containing:
            - days (int): Number of full days in the time difference.
            - hours (float): Total number of hours.
            - minutes (float): Remaining minutes after extracting hours.
            - seconds (float): Remaining seconds after extracting minutes.
    
    The time difference is calculated as (to_time - from_time).
    """
    # Default values in error cases
    days, hours, minutes, seconds = 999, 59, 59, 59
    try:
        # Normalize the timezone string for the "from" time.
        tz_str = tz_str.upper().strip()
        if not tz_str.startswith("UTC"):
            raise ValueError("Timezone string must start with 'UTC'")
        
        # Extract offset for the "from" time.
        offset_part = tz_str[3:]
        offset_hours = int(offset_part) if offset_part else 0
        tz = timezone(timedelta(hours=offset_hours))
        
        # Parse the "from" time and assign the extracted timezone.
        from_time = datetime.strptime(from_time_str, "%Y-%m-%d %H:%M:%S")
        from_time = from_time.replace(tzinfo=tz)
        from_time_utc = from_time.astimezone(timezone.utc)
        
        # Process the "to" time.
        if to_time_str:
            # Normalize the timezone string for the "to" time.
            to_tz_str = to_tz_str.upper().strip()
            if not to_tz_str.startswith("UTC"):
                raise ValueError("to_time timezone string must start with 'UTC'")
            to_offset_part = to_tz_str[3:]
            to_offset_hours = int(to_offset_part) if to_offset_part else 0
            to_tz = timezone(timedelta(hours=to_offset_hours))
            
            # Parse the "to" time and assign the corresponding timezone.
            to_time = datetime.strptime(to_time_str, "%Y-%m-%d %H:%M:%S")
            to_time = to_time.replace(tzinfo=to_tz)
            to_time_utc = to_time.astimezone(timezone.utc)
        else:
            # If "to_time_str" not provided, use current time in UTC.
            to_time_utc = datetime.now(timezone.utc)
        
        # Calculate time difference: (to_time - from_time)
        time_diff = to_time_utc - from_time_utc
        
        # Extract days and total seconds.
        days = time_diff.days
        # total_seconds = time_diff.total_seconds()
        remaining_seconds = time_diff.seconds
        
        # Calculate hours, minutes, and seconds from the total seconds.
        hours = remaining_seconds // 3600
        minutes = (remaining_seconds % 3600) // 60
        seconds = remaining_seconds % 60
    except Exception as e:
        log_message(f"[X] Failed to calculate time difference ('{from_time_str}', {tz_str}): {e}", level="warning")
    return days, hours, minutes, seconds

def sleep_random_range(base: float, spread: float=1.0) -> None:
    """
    Sleeps for a random duration between `base` and `base + spread` seconds.

    Useful for introducing random delays in automation or simulation to mimic human-like behavior
    or avoid being rate-limited by APIs.

    Args:
        base (float): The minimum number of seconds to sleep.
        spread (float): The maximum additional seconds to add to the base.

    Example:
        sleep_random_range(2, 3)  # Sleeps between 2 and 5 seconds
    """
    duration = random.uniform(base, base + spread)
    time.sleep(duration)
    return
