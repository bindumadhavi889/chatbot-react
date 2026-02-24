from sarvam_translate import translate
from llm_hf import chat_with_llm

LANG_MAP = {
    "en": {"sarvam": "en-IN"},
    "hi": {"sarvam": "hi-IN"},
    "te": {"sarvam": "te-IN"},
    "ta": {"sarvam": "ta-IN"},
    "kn": {"sarvam": "kn-IN"},
    "ml": {"sarvam": "ml-IN"},
    "mr": {"sarvam": "mr-IN"},
}

def chatbot_reply(message: str, language: str) -> str:
    if language not in LANG_MAP:
        language = "en"

    src = LANG_MAP[language]["sarvam"]
    tgt = "en-IN"

    # Step 1: Translate → English
    if language != "en":
        message_en = translate(message, src, tgt)
    else:
        message_en = message

    # Step 2: LLM
    reply_en = chat_with_llm(message_en)

    # Step 3: Translate back
    if language != "en":
        return translate(reply_en, "en-IN", src)

    return reply_en
