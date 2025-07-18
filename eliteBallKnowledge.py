from gpt_request import expand_sentence_butThreaded

import re
import json


def main():
    print("Welcome to Elite Ball Knowledge!")
    userInput = getInput()
    substitution = findMatch(userInput)
    print("\n Your original phrase: \n", substitution)
    expanded = expand_sentence_butThreaded(substitution)
    print("\n Rephrased in a professional tone: \n", expanded)


def getInput():
    user_input = input("Please enter your query: ")
    return user_input

def normalizeInput(input_text):
    text = re.sub(r"[_\-]+", " ", input_text)                     
    text = re.sub(r"([a-z])([A-Z])", r"\1 \2", text)  
    text = re.sub(r"[^\w\s]", "", text)      
    text = text.lower()
    text = text.strip()                          
    return text
    

def load_dictionary():
    with open("slangDictionary.json", "r") as f:
        return json.load(f)

def findMatch(input_text):
    word_dict = load_dictionary()
    normalized_text = normalizeInput(input_text)
    print("Normalized input:", normalized_text)
    
     # looking for longer phrases first // or i'll just sort the phrase already in the beginning
    sorted_phrases = sorted(word_dict.keys(), key=lambda x: -len(x))

    for phrase in sorted_phrases:

        # use word boundaries to match whole words
        pattern = r'\b' + re.escape(phrase) + r'\b'
        replacement = word_dict[phrase]

        normalized_text = re.sub(pattern, replacement, normalized_text)

    return normalized_text

if __name__ == "__main__":
    main()