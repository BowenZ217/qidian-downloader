#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
"""

import json
import os

STATE_FILE = os.path.join(os.path.dirname(__file__), "..", "state.json")

def load_state():
    if not os.path.exists(STATE_FILE):
        return {}
    with open(STATE_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_state(state: dict):
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2, ensure_ascii=False)

def set_manual_login_flag(flag: bool):
    state = load_state()
    state["manual_login_required"] = flag
    save_state(state)

def get_manual_login_flag():
    state = load_state()
    return state.get("manual_login_required", True)
