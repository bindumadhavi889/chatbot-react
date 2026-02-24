from gtts import gTTS
import uuid
import os

AUDIO_DIR = "audio"

def text_to_speech(text, lang):
    if not text:
        return None

    filename = f"reply_{uuid.uuid4().hex}.mp3"
    filepath = os.path.join(AUDIO_DIR, filename)

    # Map language codes
    lang_map = {
        "en": "en",
        "hi": "hi",
        "te": "te",
        "ta": "ta",
        "kn": "kn",
        "ml": "ml",
        "mr": "mr"
    }

    tts_lang = lang_map.get(lang, "en")

    tts = gTTS(text=text, lang=tts_lang)
    tts.save(filepath)

    return filename
