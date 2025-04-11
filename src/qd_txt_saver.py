#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
"""

import datetime
import json
import os

from .utils.file_saver import save_as_txt
from .utils.logger import log_message

def qd_save_as_txt(book_id: int, config: dict) -> None:
    """
    将 save_path 文件夹中该小说的所有章节 txt 文件合并保存为一个完整的 txt 文件, 
    并保存到 out_path 下
    假设章节文件名格式为 `{chapterId}.txt`
    
    处理流程：
      1. 从 book_info.json 中加载书籍信息 (包含书名、作者、更新时间、字数、简介及卷章节列表) 
      2. 遍历各卷, 每个卷先追加卷标题, 然后依次追加该卷下各章节的标题和内容, 
         如果章节文件不存在则根据 ignore_missing 参数决定是否跳过并记录日志;
         同时记录最后一个章节标题作为“原文截至”
      3. 将书籍元信息 (书名、作者、总字数、更新日期、原文截至、内容简介) 与所有章节内容拼接, 
         构成最终完整文本
      4. 将最终结果保存到 out_path 下 (例如：`{book_name}.txt`) 
    
    Args:
        book_id (int): 书籍的 ID (对应保存目录名称) 。
        config (dict): 配置字典, 包含：
            - book 配置, 例如 save_path (章节源文件存放目录) 、out_path (最终保存路径) 
            - output_options 配置, 例如 ignore_missing (是否忽略缺失的章节文件) 
    
    Returns:
        None
    """
    book_config = config.get("book", {})
    output_options_config = config.get("output_options", {})

    save_path = book_config.get("save_path", "./qidian/")
    out_path = book_config.get("out_path", "./downloads/")
    ignore_missing = output_options_config.get("ignore_missing", True)
    append_timestamp = output_options_config.get("append_timestamp", True)
    
    book_base_path = os.path.join(save_path, str(book_id))
    book_info_path = os.path.join(book_base_path, 'book_info.json')
    book_chapter_folder = os.path.join(book_base_path, 'chapters')

    try:
        with open(book_info_path, 'r', encoding='utf-8') as f:
            book_info = json.load(f)
    except Exception as e:
        log_message(f"[qd_save_as_txt] 加载 {book_info_path} 失败: {e}", level="error")
        return

    latest_chapter_title = ''
    compiled_chapters = ''

    # 遍历卷列表，并按卷内章节顺序追加章节内容
    volume_list = book_info.get("volumes", [])
    for volume in volume_list:
        volume_name = volume.get("volume_name", "")
        compiled_chapters += f"\n\n{volume_name}\n\n"
        log_message(f"[>] Processing volume: {volume_name}")
        curr_chapters = volume.get("chapters", [])
        for chapter in curr_chapters:
            chapter_id = chapter.get("chapterId")
            chapter_title = chapter.get("title", "")
            if not chapter_id:
                log_message(f"[qd_save_as_txt] 未找到 chapterId, 跳过该章节: {chapter}", level="warning")
                continue
            chapter_path = os.path.join(book_chapter_folder, f'{chapter_id}.txt')
            if not os.path.exists(chapter_path):
                if not ignore_missing:
                    log_message(f"[qd_save_as_txt] 缺失章节文件: {chapter_title} ({chapter_id})", level="warning")
                continue
            try:
                with open(chapter_path, 'r', encoding='utf-8') as cf:
                    chapter_content = cf.read()
            except Exception as e:
                log_message(f"[qd_save_as_txt] 读取章节文件 {chapter_path} 出错: {e}", level="error")
                continue
            
            # 添加章节标题和内容
            compiled_chapters += f"\n\n{chapter_content}\n\n"
            latest_chapter_title = chapter_title

    # 提取书籍元信息
    book_name = book_info.get("book_name", f"未知")
    author = book_info.get("author", "未知")
    update_time = book_info.get("update_time", "")
    word_count = book_info.get("word_count", "")
    summary = book_info.get("summary", "")

    # 拼接最终文件头信息
    header = (
        f"书名: {book_name}\n"
        f"作者: {author}\n"
        f"总字数: {word_count}\n"
        f"更新日期: {update_time}\n"
        f"原文截至: {latest_chapter_title}\n"
        f"内容简介:\n{summary}\n\n"
        f"{'-'*10}\n\n"
    )

    final_content = header + compiled_chapters

    # 确保输出目录存在
    os.makedirs(out_path, exist_ok=True)
    if append_timestamp:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        book_txt_path = os.path.join(out_path, f'{book_name}_{timestamp}.txt')
    else:
        book_txt_path = os.path.join(out_path, f'{book_name}.txt')
    
    # 保存最终文本
    try:
        save_as_txt(content=final_content, filepath=book_txt_path)
        log_message(f"[qd_save_as_txt] 合并后的小说已保存到: {book_txt_path}")
    except Exception as e:
        log_message(f"[qd_save_as_txt] 保存文件失败: {e}", level="error")
    return
