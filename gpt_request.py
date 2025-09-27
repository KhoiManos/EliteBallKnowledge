import os
from dotenv import load_dotenv

import requests
import threading

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = "mistralai/mistral-7b-instruct:free"
MODEL1 = "google/gemma-2-9b-it:free"
list = [None, None] # To store results from both models

def expand_sentence(prompt_text, model, index):
    url = "https://openrouter.ai/api/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost",     
        "X-Title": "EliteBallTranslator"
    }

    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are a writing assistant."},
            {"role": "user", "content": f"Summarize this sentence professionally using as few words as possible: {prompt_text}"}
        ],
        "temperature": 0.4,
        "max_tokens": 100
    }

    response = requests.post(url, headers=headers, json=payload)

    print("Status Code:", response.status_code)
    print("Response Text:", response.text)

    response.raise_for_status()
    data = response.json()
    data = data["choices"][0]["message"]["content"].strip()

    cleaned_data = clean_output(data)
    
    list[index] = cleaned_data
    return cleaned_data

def clean_output(text):
    
    # Entferne häufige Prompt-Tokens
    unwanted_patterns = [
        r'<s>', r'</s>', r'\[INST\]', r'\[/INST\]', 
        r'\[OUT\]', r'\[/OUT\]', r'<\|.*?\|>',
        r'^[^a-zA-Z0-9]*', r'[^a-zA-Z0-9\.!?]*$' 
    ]
    
    cleaned_text = text
    for pattern in unwanted_patterns:
        cleaned_text = re.sub(pattern, '', cleaned_text)
    
    # Entferne überflüssige Leerzeichen und trimme
    cleaned_text = ' '.join(cleaned_text.split()).strip()
    
    # Stelle sicher, dass der Text mit einem Buchstaben oder Zahl beginnt
    if cleaned_text and not cleaned_text[0].isalnum():
        cleaned_text = cleaned_text[1:].strip()
    
    return cleaned_text if cleaned_text else text 

def expand_sentence_butThreaded(prompt_text):

    thread1 = threading.Thread(target=expand_sentence, args=(prompt_text, MODEL, 0))
    thread2 = threading.Thread(target=expand_sentence, args=(prompt_text, MODEL1, 1))
    thread1.start()
    thread2.start()

    thread1.join()
    thread2.join()
    return checkList()

def checkList():
    if list[0] is None:
        return list[1]
    else:
        return list[0]