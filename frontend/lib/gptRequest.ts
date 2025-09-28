const API_KEY = process.env.OPENROUTER_API_KEY;

const MODEL1 = "google/gemma-2-9b-it:free";

async function expandSentence(promptText: string, model: string): Promise<string> {
  const url = "https://openrouter.ai/api/v1/chat/completions";

  const headers = {
    "Authorization": `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "https://eliteballknowledge.vercel.app",
    "X-Title": "EliteBallTranslator"
  };

  const payload = {
    "model": model,
    "messages": [
      {"role": "system", "content": "You are a writing assistant."},
      {"role": "user", "content": `Summarize this sentence professionally using as few words as possible: ${promptText}`}
    ],
    "temperature": 0.4,
    "max_tokens": 100
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  let text = data.choices[0].message.content.trim();
  return cleanOutput(text);
}

function cleanOutput(text: string): string {
  const unwantedPatterns = [
    /<s>/g, /<\/s>/g, /\[INST\]/g, /\[\/INST\]/g, 
    /\[OUT\]/g, /\[\/OUT\]/g, /<\|.*?\|>/g,
    /^[^a-zA-Z0-9]*/, /[^a-zA-Z0-9\.!?]*$/ 
  ];
  
  let cleanedText = text;
  unwantedPatterns.forEach(pattern => {
    cleanedText = cleanedText.replace(pattern, '');
  });
  
  cleanedText = cleanedText.split(/\s+/).join(' ').trim();
  
  if (cleanedText && !cleanedText[0].match(/[a-zA-Z0-9]/)) {
    cleanedText = cleanedText.slice(1).trim();
  }
  
  return cleanedText || text;
}

export async function expandSentenceButThreaded(promptText: string): Promise<string> {
  try {
    const [result1] = await Promise.all([
      expandSentence(promptText, MODEL1),
      
    ]);

    
    return result1
  } catch (error) {
    console.error("Error in expandSentenceButThreaded:", error);
    throw error;
  }
}