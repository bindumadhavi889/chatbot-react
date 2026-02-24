from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import shutil
import os
import uuid

from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from asr_whisper import speech_to_text
from chatbot import chatbot_reply
from tts_gtts import text_to_speech

# ---------------- APP SETUP ----------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

AUDIO_DIR = "audio"
os.makedirs(AUDIO_DIR, exist_ok=True)

app.mount("/audio", StaticFiles(directory=AUDIO_DIR), name="audio")

# ---------------- TEXT CHAT ----------------
class TextRequest(BaseModel):
    text: str
    language: str = "en"

@app.post("/text-chat")
def text_chat(req: TextRequest):
    reply = chatbot_reply(req.text, req.language)

    # ✅ TEXT ONLY — NO TTS
    return {
        "user_text": req.text,
        "reply_text": reply
    }

# ---------------- VOICE CHAT ----------------
@app.post("/voice-chat")
async def voice_chat(audio: UploadFile = File(...)):
    ext = os.path.splitext(audio.filename)[1]
    input_path = f"{AUDIO_DIR}/input_{uuid.uuid4().hex}{ext}"

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(audio.file, buffer)

    user_text, detected_lang = speech_to_text(input_path)
    reply_text = chatbot_reply(user_text, detected_lang)

    audio_out = text_to_speech(reply_text, detected_lang)

    return {
        "detected_language": detected_lang,
        "audio_file": audio_out   # frontend plays this
    }