const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL1 = "google/gemma-3n-e2b-it:free";
const MODEL2 = "google/gemma-3n-e4b-it:free";

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
      {"role": "user", "content": `Rewrite this phrase into one concise and professional sentence, without giving me extra infromation: "${promptText}"`}
    ],
    "temperature": 0.7,  
    "max_tokens": 80    
  };

  console.log(`Calling OpenRouter API with model: ${model}`);

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
  console.log("API Key vorhanden:", !!API_KEY);
  console.log("API Key Länge:", API_KEY?.length);

  try {
    // Versuche zuerst MODEL1, falls das fehlschlägt, versuche MODEL2
    try {
      const result1 = await expandSentence(promptText, MODEL1);
      return result1;
    } catch (error1) {
      console.log(`Model ${MODEL1} failed, trying ${MODEL2}:`, error1);
      const result2 = await expandSentence(promptText, MODEL2);
      return result2;
    }
  } catch (error) {
    console.error("Both models failed in expandSentenceButThreaded:", error);
    throw error;
  }
}