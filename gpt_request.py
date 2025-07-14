import os
from dotenv import load_dotenv

import requests

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = "mistralai/mistral-7b-instruct:free"

def expand_sentence(prompt_text):
    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost",     
        "X-Title": "EliteBallTranslator"
    }

    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "You are a formal writing assistant."},
            {"role": "user", "content": f"Rephrase this sentence in a professional, concise tone: {prompt_text}"}
        ],
        "temperature": 0.4,
        "max_tokens": 100
    }

    response = requests.post(url, headers=headers, json=payload)

    print("Status Code:", response.status_code)
    print("Response Text:", response.text)

    response.raise_for_status()
    data = response.json()
    return data["choices"][0]["message"]["content"].strip()
