import os
import requests
from dotenv import load_dotenv

load_dotenv()

SARVAM_API_KEY = os.getenv("SARVAM_API_KEY")
if not SARVAM_API_KEY:
    raise RuntimeError("SARVAM_API_KEY not set")

TRANSLATE_URL = "https://api.sarvam.ai/translate"

HEADERS = {
    "api-subscription-key": SARVAM_API_KEY,
    "Content-Type": "application/json"
}

def translate(text: str, src: str, tgt: str) -> str:
    """
    Translate text using Sarvam Translate API.
    src/tgt should be language codes like 'en-IN' or 'te-IN'.
    """
    payload = {
        "input": text,
        "source_language_code": src,
        "target_language_code": tgt
    }

    try:
        response = requests.post(TRANSLATE_URL, json=payload, headers=HEADERS, timeout=20)
        print("SARVAM STATUS:", response.status_code)
        print("SARVAM RESPONSE:", response.text)

        response.raise_for_status()

        # The API returns a field named "translated_text"
        return response.json().get("translated_text", text)

    except requests.exceptions.RequestException as e:
        print("Sarvam translate failed:", e)
        return text
