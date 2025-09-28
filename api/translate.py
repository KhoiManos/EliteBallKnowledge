from http.server import BaseHTTPRequestHandler
import json
import sys
import os

# Pfad zu deinen Python Modulen
sys.path.append(os.path.dirname(__file__))

try:
    from eliteBallKnowledge import findMatch
    from gpt_request import expand_sentence_butThreaded
except ImportError as e:
    print(f"Import error: {e}")

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            
            user_input = data.get("textInput", "").strip()

            if not user_input:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Empty input"}).encode())
                return

            # DEINE EXISTIERENDE LOGIK - UNVERÄNDERT!
            substitution = findMatch(user_input)
            result = expand_sentence_butThreaded(substitution)

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "original": user_input,
                "translated": result
            }).encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())