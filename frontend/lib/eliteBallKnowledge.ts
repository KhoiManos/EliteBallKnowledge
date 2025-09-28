import slangDictionary from '../../slangDictionary.json';

export function normalizeInput(inputText: string): string {
  let text = inputText.replace(/[_-]+/g, ' ');
  text = text.replace(/([a-z])([A-Z])/g, '$1 $2');
  text = text.replace(/[^\w\s]/g, '');
  text = text.toLowerCase();
  text = text.trim();
  return text;
}

export function findMatch(inputText: string): string {
  const wordDict: Record<string, string> = slangDictionary;
  const normalizedText = normalizeInput(inputText);
  console.log("Normalized input:", normalizedText);

  // Sort phrases by length descending to match longer phrases first
  const sortedPhrases = Object.keys(wordDict).sort((a, b) => b.length - a.length);

  let result = normalizedText;
  for (const phrase of sortedPhrases) {
    const pattern = new RegExp('\\b' + phrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'g');
    const replacement = wordDict[phrase];
    result = result.replace(pattern, replacement);
  }

  return result;
}