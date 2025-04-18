#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
[DEPRECATED] OCR Utils Class

This class provides utility methods for optical character recognition (OCR) and font mapping,
primarily used for decrypting custom font encryption on web pages (e.g., the Qidian website). It supports:

- Loading and processing known labeled character images using perceptual hashing (phash)
  to build a database of known characters.
- Loading precomputed character image vectors and corresponding labels for vector-based matching,
  leveraging cosine similarity to compare input images.
- Optionally initializing and using PaddleOCR for direct character recognition.
- Providing fallback mechanisms that combine OCR, hash matching, and vector matching to identify
  characters in rendered images.
- Generating a mapping from obfuscated (randomized) fonts to their real characters by rendering
  both reference and obfuscated fonts, then matching the results.
- Formatting and applying the generated font mapping to convert encrypted text into readable text.

The class uses libraries such as Pillow, imagehash, numpy, fontTools, and scikit-learn.
When enabled, it integrates PaddleOCR for advanced OCR capabilities.

This set of utilities is a core component of the qidian-font-decoder project,
designed to help restore real text from dynamically scrambled fonts used as an anti-crawling measure.
"""

import os
import json

import imagehash
import numpy as np
from numpy import asarray
from fontTools.ttLib import TTFont
from PIL import Image, ImageFont, ImageDraw
from sklearn.metrics.pairwise import cosine_similarity

from .logger import log_message

class OCRUtilsV1:
    """[DEPRECATED] Original OCR utility class."""
    # Default constants
    CHAR_CANVAS_SIZE = 64
    CHAR_FONT_SIZE = 48
    OCR_WEIGHT = 0.05
    VECTOR_WEIGHT = 1.0
    CANDIDATE_K = 5
    CANDIDATE_FACTOR = 5
    IMAGE_FOLDER = 'chars'  # Subfolder name for image saving

    # Global cached resources
    _global_known_hash_db = None
    _global_char_vector_db = None
    _global_char_vector_labels = None
    _global_char_vector_shape = None
    _global_char_freq_db = None
    _global_ocr = None

    def __init__(self,
                 use_ocr: bool = False,
                 use_freq: bool = False,
                 save_image: bool = False,
                 known_image_folder: str = None,
                 fixed_font_map_folder: str = None,
                 known_mapping_json: str = None,
                 vector_npy_path: str = None,
                 label_txt_path: str = None,
                 char_freq_path: str = None):
        """
        Initializes instance variables and sets up default resource paths.
        If paths are not provided, they are computed relative to the project root.

        Initializes global values including OCR engine, image hash DB, vector DB, and
        optionally the character frequency DB.
        """
        cur_dir = os.path.dirname(os.path.abspath(__file__))
        root_dir = os.path.abspath(os.path.join(cur_dir, "..", ".."))

        # Set resource paths (allowing override by parameters)
        self.known_image_folder = known_image_folder or os.path.join(root_dir, "resources", "known_chars")
        self.fixed_font_map_folder = fixed_font_map_folder or os.path.join(root_dir, "resources", "fixed_font_map")
        self.known_mapping_json = known_mapping_json or os.path.join(root_dir, "resources", "image_label_map.json")
        self.vector_npy_path = vector_npy_path or os.path.join(root_dir, "resources", "char_vectors.npy")
        self.label_txt_path = label_txt_path or os.path.join(root_dir, "resources", "char_vectors.txt")
        self.char_freq_path = char_freq_path or os.path.join(root_dir, "resources", "char_freq.json")

        # Ensure necessary folders exist.
        os.makedirs(self.known_image_folder, exist_ok=True)
        os.makedirs(self.fixed_font_map_folder, exist_ok=True)

        # Instance variables for OCR and databases.
        self.use_ocr = use_ocr
        self.use_freq = use_freq
        self.save_image = save_image

        self.ocr = None
        if OCRUtilsV1._global_known_hash_db is not None:
            self.known_hash_db = OCRUtilsV1._global_known_hash_db
        else:
            self.known_hash_db = None

        if OCRUtilsV1._global_char_vector_db is not None:
            self.char_vector_db = OCRUtilsV1._global_char_vector_db
            self.char_vector_labels = OCRUtilsV1._global_char_vector_labels
            self.char_vector_shape = OCRUtilsV1._global_char_vector_shape
        else:
            self.char_vector_db = None
            self.char_vector_labels = None
            self.char_vector_shape = None  # (H, W)

        if OCRUtilsV1._global_char_freq_db is not None:
            self.char_freq_db = OCRUtilsV1._global_char_freq_db
        else:
            self.char_freq_db = None

        if self.use_ocr:
            if OCRUtilsV1._global_ocr is not None:
                self.ocr = OCRUtilsV1._global_ocr
            else:
                import paddle
                from paddleocr import PaddleOCR
                gpu_available = paddle.device.is_compiled_with_cuda()
                self.ocr = PaddleOCR(use_angle_cls=False, lang='ch', det=False,
                                     use_gpu=gpu_available, show_log=False,
                                     rec_model_dir='PP-OCRv4-server')
                OCRUtilsV1._global_ocr = self.ocr
        else:
            self.ocr = None

        if self.known_hash_db is None:
            state = self.load_known_images(self.known_image_folder, self.known_mapping_json)
            OCRUtilsV1._global_known_hash_db = self.known_hash_db

        if self.char_vector_db is None:
            state = self.load_known_vector_db()
            OCRUtilsV1._global_char_vector_db = self.char_vector_db
            OCRUtilsV1._global_char_vector_labels = self.char_vector_labels
            OCRUtilsV1._global_char_vector_shape = self.char_vector_shape

        if self.use_freq:
            if self.char_freq_db is None:
                state = self.load_char_freq_db()
                OCRUtilsV1._global_char_freq_db = self.char_freq_db

    def load_known_images(self, image_folder: str, mapping_json_path: str) -> bool:
        """
        Loads known labeled character images into a hash DB using perceptual hashing.

        Args:
            image_folder (str): Folder containing the labeled character images.
            mapping_json_path (str): JSON file mapping image filenames to character labels.

        Returns:
            bool: True if successfully loaded, False otherwise.
        """
        if not os.path.exists(mapping_json_path) or not os.path.isdir(image_folder):
            log_message(f"[!] Skipping hash DB loading: missing file or folder", level="warning")
            self.known_hash_db = None
            return False

        try:
            with open(mapping_json_path, 'r', encoding='utf-8') as f:
                label_map = json.load(f)
        except Exception as e:
            log_message(f"[X] Failed to load label map: {e}", level="warning")
            self.known_hash_db = None
            return False

        hash_db = {}
        for filename, label in label_map.items():
            img_path = os.path.join(image_folder, filename)
            if not os.path.exists(img_path):
                continue
            try:
                img = Image.open(img_path).convert('L')
                img_hash = imagehash.phash(img)
                hash_db[img_hash] = label
            except Exception as e:
                log_message(f"[!] Skipping image {filename}: {e}", level="warning")
                continue

        if not hash_db:
            log_message("[!] No valid images found in hash DB.", level="warning")
            self.known_hash_db = None
            return False

        self.known_hash_db = hash_db
        log_message(f"[DONE] Loaded {len(hash_db)} image hashes from: {image_folder}")
        return True

    def load_known_vector_db(self) -> bool:
        """
        Loads precomputed character vectors and their labels from resource files.

        Returns:
            bool: True if successfully loaded, False otherwise.
        """
        if not os.path.exists(self.vector_npy_path) or not os.path.exists(self.label_txt_path):
            log_message(f"[!] Vector or label file not found. Skipping loading.", level="warning")
            return False

        try:
            self.char_vector_db = np.load(self.vector_npy_path)
            num_chars, dim = self.char_vector_db.shape
            side = int(np.sqrt(dim))
            self.char_vector_shape = (side, side)

            with open(self.label_txt_path, "r", encoding="utf-8") as f:
                self.char_vector_labels = [line.strip() for line in f]

            log_message(f"[DONE] Loaded {num_chars} character vectors (size: {self.char_vector_shape})")
            return True
        except Exception as e:
            log_message(f"[X] Failed to load known vector DB: {e}", level="warning")
            return False

    def load_char_freq_db(self) -> bool:
        """
        Loads character frequency data from a JSON file and assigns it to the instance variable.

        Returns:
            bool: True if successfully loaded, False otherwise.
        """
        if not os.path.exists(self.char_freq_path):
            log_message(f"[!] Frequency file not found. Skipping loading.", level="warning")
            return False

        try:
            with open(self.char_freq_path, "r", encoding="utf-8") as f:
                self.char_freq_db = json.load(f)
            log_message(f"[DONE] Successfully loaded character frequency data from {self.char_freq_path}")
            return True
        except json.JSONDecodeError as e:
            log_message(f"[X] JSON decoding error while loading frequency table: {e}", level="warning")
        except Exception as e:
            log_message(f"[X] Unexpected error while loading frequency table DB: {e}", level="warning")
        return False

    def match_known_image(self, img: Image.Image, known_hash_db: dict = None, threshold: int = 5):
        """
        Matches an image to known image hashes using perceptual hashing.

        Args:
            img (PIL.Image): Input image to match.
            known_hash_db (dict, optional): Hash DB to use; if None, uses the instance’s DB.
            threshold (int): Maximum allowed hamming distance.

        Returns:
            str or None: Best matched character label, or None if not found.
        """
        known_hash_db = known_hash_db or self.known_hash_db
        if not known_hash_db:
            return None

        try:
            img_hash = imagehash.phash(img)
        except Exception as e:
            log_message(f"[X] Failed to compute hash for image: {e}", level="warning")
            return None

        best_match = None
        best_distance = threshold + 1
        for h, label in known_hash_db.items():
            dist = abs(img_hash - h)
            if dist < best_distance:
                best_distance = dist
                best_match = label

        return best_match if best_distance <= threshold else None

    def match_known_image_v2(self, img: Image.Image, top_k: int = 1, alpha: float = 0.05):
        """
        Matches an input image to known character vectors using cosine similarity.

        Args:
            img (PIL.Image): Input image to match.
            top_k (int): Number of top matches to return.
            alpha (float): Frequency bonus weight factor.

        Returns:
            (str, float) or List[Tuple[str, float]]:
                - For top-1: returns (character, similarity)
                - For top-k: returns a list of (character, similarity) tuples.
                - If no match is found or vectors are not loaded, returns an empty result.
        """
        if self.char_vector_db is None or self.char_vector_labels is None or self.char_vector_shape is None:
            return "" if top_k == 1 else []

        try:
            # Preprocess the image.
            img = img.convert("L").resize(self.char_vector_shape)
            vec = np.array(img).astype(np.float32).flatten() / 255.0

            # Compute cosine similarities.
            sims = cosine_similarity([vec], self.char_vector_db)[0]
            top_sim = np.max(sims)
            if not self.use_freq or top_sim > 0.98:
                top_indices = np.argsort(sims)[-top_k:][::-1]
                results = [(self.char_vector_labels[i], sims[i]) for i in top_indices]
                return results[0] if top_k == 1 else results

            # Determine candidate pool size (e.g., top_k * 5).
            candidate_count = min(len(sims), top_k * self.CANDIDATE_FACTOR)
            candidate_indices = np.argsort(sims)[-candidate_count:][::-1]

            candidates = []
            max_freq = 5  # Worst-case frequency value.
            for i in candidate_indices:
                char = self.char_vector_labels[i]
                sim = sims[i]
                freq = self.char_freq_db.get(char, 5) if self.char_freq_db else 5
                # Normalize frequency to a bonus in [0, 1] where lower freq gives a higher bonus.
                freq_bonus = (max_freq - freq) / max_freq
                composite_score = sim + alpha * freq_bonus
                candidates.append((char, sim, composite_score))

            # Re-rank candidates by composite score in descending order.
            candidates.sort(key=lambda x: x[2], reverse=True)
            # Prepare final results (return only the character and the original similarity).
            final_results = [(char, sim) for char, sim, _ in candidates[:top_k]]
            return final_results[0] if top_k == 1 else final_results
        except Exception as e:
            log_message(f"[X] Failed to match image: {e}", level="warning")
            return "" if top_k == 1 else []

    def recognize_with_fallback(self, char: str, img: Image.Image,
                                vector_threshold: float = 0.95, top_k: int = 1):
        """
        Tries to recognize a character image using a chain of fallback methods:
        perceptual hash matching, vector matching, then (optionally) OCR.

        Args:
            char (str): Original character (for logging).
            img (PIL.Image): Image to recognize.
            vector_threshold (float): Similarity threshold for vector matching.
            top_k (int): Number of results to return.

        Returns:
            str or List[Tuple[str, float]]: Recognized character or list of candidates.
        """
        # Fallback: hash match
        matched_char = self.match_known_image(img)
        if matched_char:
            log_message(f"[Fallback] Image hash matched: '{char}' -> '{matched_char}'")
            return matched_char if top_k == 1 else [(matched_char, 1.0)]

        candidate_scores = {}

        # Fallback: vector matching
        vector_matches = self.match_known_image_v2(img, top_k=self.CANDIDATE_K)
        if isinstance(vector_matches, tuple):
            vector_matches = [vector_matches]
        if vector_matches:
            vector_matches.sort(key=lambda x: x[1], reverse=True)
            top_match_char, top_match_score = vector_matches[0]
            if top_match_score > min(vector_threshold + 0.045, 0.995):
                log_message(f"[Vector] Recognition succeeded ({top_match_score:.4f}): '{char}' -> '{top_match_char}'")
                return top_match_char if top_k == 1 else [(top_match_char, 1.0)]
            for v_char, sim_score in vector_matches:
                candidate_scores[v_char] = candidate_scores.get(v_char, 0) + sim_score * self.VECTOR_WEIGHT
                log_message(f"[Vector] Added candidate: '{v_char}', similarity: {sim_score}")
        else:
            log_message("[Vector] No matching candidate found", level="warning")

        # Fallback: OCR (if enabled)
        if self.use_ocr and self.ocr is not None:
            try:
                img_np = asarray(img)
                ocr_results = self.ocr.ocr(img_np, det=False, cls=False)
                if ocr_results and ocr_results[0]:
                    # Convert OCR results to a candidate list. Expected format: [[box, (text, confidence)], ...]
                    ocr_candidates = []
                    for line in ocr_results:
                        for res in line:
                            text, conf = res
                            if conf < 0.9 or len(text) != 1:
                                continue
                            ocr_candidates.append((text, conf))
                    # Sort by confidence in descending order and take top CANDIDATE_K results
                    ocr_candidates.sort(key=lambda x: x[1], reverse=True)
                    for text, conf in ocr_candidates[:self.CANDIDATE_K]:
                        candidate_scores[text] = candidate_scores.get(text, 0) + conf * self.OCR_WEIGHT
                        log_message(f"[OCR] Added candidate: '{text}', OCR confidence: {conf}")
            except Exception as e:
                log_message(f"[OCR] Recognition error: {e}", level="warning")

        if not candidate_scores:
            log_message(f"[char] Recognition failed: '{char}' ({hex(ord(char))})", level="warning")
            return None if top_k == 1 else []

        sorted_candidates = sorted(candidate_scores.items(), key=lambda x: x[1], reverse=True)
        best_candidate, best_score = sorted_candidates[0]
        if best_score < vector_threshold:
            log_message(f"[char] Recognition failed: '{char}' ({hex(ord(char))}), best score: {best_score:.4f} below threshold {vector_threshold}", level="warning")
            return None if top_k == 1 else []
        log_message(f"[char] Recognition succeeded ({best_score:.4f}): '{char}' -> '{best_candidate}'")
        return best_candidate if top_k == 1 else sorted_candidates[:top_k]

    def generate_font_mapping(self, fixed_font_path: str, random_font_path: str,
                              char_set: set, refl_set: set, output_path: str = None) -> dict:
        """
        Generates a mapping from encrypted (randomized) font characters to their
        real recognized characters by rendering and OCR-based matching.

        Args:
            fixed_font_path (str): Path to the reference (fixed) font.
            random_font_path (str): Path to the obfuscated (random) font.
            char_set (set): Characters to process normally.
            refl_set (set): Characters to process as horizontally flipped.
            output_path (str): Directory where results/images will be saved.

        Returns:
            dict: Mapping of obfuscated characters to recognized characters.
                  Also saves the mapping as JSON files.
        """
        try:
            fixed_font_map = {}
            fixed_font_filename = os.path.basename(fixed_font_path)
            fixed_font_map_path = os.path.join(self.fixed_font_map_folder, f"{fixed_font_filename}.json")
            if os.path.exists(fixed_font_map_path):
                with open(fixed_font_map_path, 'r', encoding='utf-8') as f:
                    fixed_font_map = json.load(f)
                log_message(f"[FONT] Loaded fixed font map from: {fixed_font_map_path}")

            # Load fonts and their character mappings.
            fixed_ttf = TTFont(fixed_font_path)
            fixed_cmap = fixed_ttf.getBestCmap()
            fixed_chars = {chr(code) for code in fixed_cmap.keys()}
            fixed_render = ImageFont.truetype(fixed_font_path, self.CHAR_FONT_SIZE)

            random_ttf = TTFont(random_font_path)
            random_cmap = random_ttf.getBestCmap()
            random_chars = {chr(code) for code in random_cmap.keys()}
            random_render = ImageFont.truetype(random_font_path, self.CHAR_FONT_SIZE)

            # Ensure that our databases are initialized.
            if (self.char_vector_db is None or self.char_vector_labels is None or
                self.char_vector_shape is None or self.known_hash_db is None):
                return {}

            if self.save_image and output_path:
                os.makedirs(os.path.join(output_path, self.IMAGE_FOLDER, "found"), exist_ok=True)
                os.makedirs(os.path.join(output_path, self.IMAGE_FOLDER, "unfound"), exist_ok=True)

            mapping_result = {}

            # Inner helper function: render a character (and optionally mirror it), then return the image.
            def render_and_ocr(ch: str, is_reflect: bool = False):
                if ch in fixed_chars:
                    render_font = fixed_render
                elif ch in random_chars:
                    render_font = random_render
                else:
                    return None, False  # Character not available in either font

                img = Image.new("L", (self.CHAR_CANVAS_SIZE, self.CHAR_CANVAS_SIZE), color=255)
                draw = ImageDraw.Draw(img)
                bbox = draw.textbbox((0, 0), ch, font=render_font)
                w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
                x = (self.CHAR_CANVAS_SIZE - w) // 2 - bbox[0]
                y = (self.CHAR_CANVAS_SIZE - h) // 2 - bbox[1]
                draw.text((x, y), ch, fill=0, font=render_font)

                if is_reflect:
                    img = img.transpose(Image.FLIP_LEFT_RIGHT)
                return img, True

            # Process normal characters.
            for ch in sorted(char_set):
                if ch in fixed_chars and ch in fixed_font_map:
                    mapped_char = fixed_font_map[ch]
                    log_message(f"[FONT] Reused mapping: '{ch}' -> '{mapped_char}' from fixed_font_map")
                    mapping_result[ch] = mapped_char
                    continue

                img, valid = render_and_ocr(ch)
                if not valid:
                    continue

                found_path = os.path.join(output_path, self.IMAGE_FOLDER, "found", f"{hex(ord(ch))}.png")
                unfound_path = os.path.join(output_path, self.IMAGE_FOLDER, "unfound", f"{hex(ord(ch))}.png")
                matched_char = self.recognize_with_fallback(ch, img)
                if matched_char:
                    if self.save_image and output_path:
                        img.save(found_path)
                    mapping_result[ch] = matched_char
                    if ch in fixed_chars:
                        fixed_font_map[ch] = matched_char
                else:
                    if self.save_image and output_path:
                        img.save(unfound_path)

            # Process mirrored characters.
            for ch in sorted(refl_set):
                if ch in fixed_chars and ch in fixed_font_map:
                    mapped_char = fixed_font_map[ch]
                    log_message(f"[FONT] Reused mapping: '{ch}' -> '{mapped_char}' from fixed_font_map")
                    mapping_result[ch] = mapped_char
                    continue

                img, valid = render_and_ocr(ch, is_reflect=True)
                if not valid:
                    continue

                found_path = os.path.join(output_path, self.IMAGE_FOLDER, "found", f"{hex(ord(ch))}.png")
                unfound_path = os.path.join(output_path, self.IMAGE_FOLDER, "unfound", f"{hex(ord(ch))}.png")
                matched_char = self.recognize_with_fallback(ch, img)
                if matched_char:
                    if self.save_image and output_path:
                        img.save(found_path)
                    mapping_result[ch] = matched_char
                    if ch in fixed_chars:
                        fixed_font_map[ch] = matched_char
                else:
                    if self.save_image and output_path:
                        img.save(unfound_path)

            # Save mapping result
            if output_path:
                mapping_filepath = os.path.join(output_path, "font_mapping.json")
                with open(mapping_filepath, 'w', encoding='utf-8') as f:
                    json.dump(mapping_result, f, ensure_ascii=False, indent=2)
                with open(fixed_font_map_path, 'w', encoding='utf-8') as f:
                    json.dump(fixed_font_map, f, ensure_ascii=False, indent=2)
            return mapping_result

        except Exception as e:
            log_message(f"[X] An error occurred: {e}", level="warning")
        return {}

    def format_font_mapping_md(self, font_map: dict, output_folder: str):
        """
        Saves the font mapping as a Markdown file including corresponding images.

        Args:
            font_map (dict): Mapping of original to recognized characters.
            output_folder (str): Directory where the Markdown file will be saved.
        """
        try:
            image_dir = os.path.join(self.IMAGE_FOLDER, "found")
            out_path = os.path.join(output_folder, "font_mapping.md")
            with open(out_path, "w", encoding="utf-8") as md_file:
                for original_char, recognized_char in font_map.items():
                    unicode_hex = hex(ord(original_char))
                    # Normalize Windows path separators.
                    image_path = os.path.join(image_dir, f"{unicode_hex}.png").replace("\\", "/")
                    md_file.write(f"**{original_char}** ({unicode_hex}) -> **{recognized_char}**\n\n")
                    md_file.write(f"![{original_char}]({image_path})\n\n")
                    md_file.write("---\n\n")
            log_message(f"[DONE] Markdown file saved to: {out_path}")
        except Exception as e:
            log_message(f"[X] Error writing Markdown file: {e}", level="warning")
