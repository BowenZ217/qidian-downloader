# qidian-downloader

起点小说下载器

## 项目简介

**qidian-downloader** 是一个基于 [DrissionPage](https://www.drissionpage.cn) 开发的起点小说下载器, 旨在自动爬取起点中文网的小说章节内容, 并将各章节整合输出为一个完整的 TXT 文件。

## 功能

- 爬取起点中文网的小说章节内容
- 自动整合所有章节生成完整的 TXT 文件 (文件名中附加时间戳以避免覆盖) 
- **TODO:** 支持输出为 EPUB 格式
- **TODO:** 支持广告过滤

## 环境准备

本项目基于 [DrissionPage](https://www.drissionpage.cn) , 请确保在计算机上已安装 [Google Chrome](https://www.google.com/chrome/)。
如果遇到 “无法找到浏览器可执行文件路径, 请手动配置” 的问题, 请访问 [DrissionPage官网](https://www.drissionpage.cn/get_start/before_start/) 查阅帮助文档。

建议使用 Anaconda 创建独立的 Python 环境, 以避免包冲突: 

```bash
conda create -n qd_downloader python=3.11 -y
conda activate qd_downloader
pip install -r requirements.txt
```

> **额外依赖**
>
> 对于一个月内更新的章节, 起点可能有字体加密
>
> 如果开启尝试解密字体功能 (`decode_font` 参数), 需要安装额外库 (注意: 解密字体准确率大约 97%, 并且一章约需要一分多钟): 
>
> ```bash
> pip install -r requirements-font-decoder.txt
> ```
>
> 如果启用 `use_ocr` 参数, 则需安装 [PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) 及相关依赖 (请根据 PaddleOCR [文档](https://paddlepaddle.github.io/PaddleOCR/latest/quick_start.html) 选择合适版本和 CUDA 支持) : 
>
> ```bash
> python -m pip install paddlepaddle==3.0.0rc1 -i https://www.paddlepaddle.org.cn/packages/stable/cpu/
> pip install paddleocr
> ```
>
> 当前使用版本示例: 
>
> ```bash
> paddleocr==2.10.0
> paddlepaddle==3.0.0rc1
> ```
>
> 如果不启用 OCR (即不使用 `use_ocr` 参数) , 则无需安装 PaddleOCR 及 paddle 相关。

## 使用方法

1. **克隆项目**

   ```bash
   git clone https://github.com/BowenZ217/qidian-downloader.git
   cd qidian-downloader
   ```

2. **配置设置**

   将 `config/sample_settings.yaml` 重命名为 `config/settings.yaml`, 然后根据你的需求修改配置参数。例如:

    ```yaml
    book:
        # 小说 ID 列表 (例如: 打开小说页面 https://www.qidian.com/book/1010868264/ , 其 ID 为 1010868264)
        book_ids:
            - 1010868264
            - 1234567890
    content_handling:
        # 是否尝试解码混淆字体
        save_html: true
        decode_font: false
        use_freq: true # 是否使用频率分析
        use_ocr: false # 是否使用 OCR 辅助识别文本
    output_options:
        ignore_missing: true
        append_timestamp: true
        make_txt: true
    ```

   其中, `append_timestamp` 配置项用于在生成的 TXT 文件名中附加时间戳, 避免保存时覆盖已有文件。

3. **运行下载程序**

   在项目根目录下运行脚本: 

   ```bash
   python main.py
   ```

   首次运行时, 程序可能会打开浏览器提示登录, 请按提示登录你的账号, 以便程序能获取需要的小说内容。

## `settings.yaml` 配置说明

### `browser` 浏览器配置

| 参数名            | 类型    | 默认值       | 说明 |
|------------------|--------|------------|------|
| `headless`       | bool   | `false`    | 是否使用无头模式（隐藏浏览器界面） |
| `wait_time`      | int    | `10`       | 请求超时时间，单位秒 |
| `retry_times`    | int    | `3`        | 请求失败时的最大重试次数 |
| `retry_interval` | int    | `5`        | 每次重试之间的间隔秒数 |
| `user_data_folder` | str | `"user_data"` | Chrome 用户数据主目录（用于保留登录状态） |
| `profile_name`   | str    | `"Profile_1"` | 用户配置子目录，和 Chrome 用户目录一致 |

### `book` 小说抓取配置

| 参数名             | 类型    | 默认值         | 说明 |
|------------------|--------|--------------|------|
| `book_ids`       | list   | `[]`         | 要下载的小说 ID 列表（从小说链接中提取） |
| `wait_time`      | int    | `10`         | 每次章节请求之间的间隔 |
| `save_path`      | str    | `"./qidian/"` | 原始章节内容的保存目录 |
| `out_path`       | str    | `"./downloads/"` | 合并后的 TXT / EPUB 输出路径 |
| `local_cache_dir`| str    | `"./local_cache/"` | 字体缓存、图像缓存等数据存放目录 |

### `content_handling` 内容处理配置

| 参数名        | 类型    | 默认值 | 说明 |
|-------------|--------|--------|------|
| `save_html` | bool   | `false` | 是否保存抓取到的原始 HTML 内容（调试用） |
| `decode_font` | bool | `false` | 是否尝试识别/解密网页中的字体混淆字符 |
| `use_freq`  | bool   | `true`  | 字体解密时是否启用频率优先策略 |
| `use_ocr`   | bool   | `false` | 字体解密时是否启用 OCR 辅助识别（需安装 paddleocr） |

### `output_options` 输出设置

| 参数名              | 类型    | 默认值   | 说明 |
|-------------------|--------|--------|------|
| `ignore_missing`  | bool   | `true` | 若章节缺失是否跳过（否则报错中断） |
| `append_timestamp`| bool   | `true` | 合并输出文件名中是否附加时间戳（避免覆盖） |
| `make_txt`        | bool   | `true` | 是否生成合并的 TXT 文件 |
| `make_epub`       | bool   | `false`| 是否生成 EPUB 文件（尚未实现） |


## 文件保存

- 章节存储: 每部小说的章节内容会保存在配置文件中指定的 `save_path` 文件夹中, 章节文件名格式为 `{chapterId}.txt`。
- 整合输出: 读取所有章节后, 程序会将它们整合成一个完整的 TXT 文件, 并保存到 `out_path` 中。若启用 `append_timestamp` 选项, 生成的文件名会在原书名基础上附加当前时间戳, 以免重复保存时覆盖旧文件。

## 项目说明

- 本项目仅供学习和研究使用, 不得用于任何商业或违法用途。请遵守目标网站 (起点中文网) 的 robots.txt 以及相关法律法规。
- 本项目开发者对因使用该工具所引起的任何法律责任不承担任何责任。
- 如果遇到网站结构变化或其他问题, 可能导致程序无法正常工作, 请自行调整代码或寻找其他解决方案。
