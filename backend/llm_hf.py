import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "qwen:0.5b"   # or tinyllama

def chat_with_llm(message: str):
    payload = {
        "model": MODEL_NAME,
        "prompt": f"Reply like a friendly human:\n{message}",
        "stream": False
    }
    response = requests.post(OLLAMA_URL, json=payload)
    response.raise_for_status()

    return response.json()["response"]
