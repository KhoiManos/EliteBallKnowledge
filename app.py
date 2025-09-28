# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import eliteBallKnowledge  # Stelle sicher, dass dies existiert
import gpt_request        # Stelle sicher, dass dies existiert

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return {
        "message": "EliteBallKnowledge API is running!",
        "endpoints": {
            "translate": "/translate (POST)"
        }
    }

@app.route("/translate", methods=["POST"])
def translate():
    try:
        data = request.get_json()
        user_input = data.get("textInput", "").strip()

        if not user_input:
            return jsonify({"error": "Empty input"}), 400

        # Verarbeite die Eingabe
        substitution = eliteBallKnowledge.findMatch(user_input)
        result = gpt_request.expand_sentence_butThreaded(substitution)

        return jsonify({
            "original": user_input,
            "translated": result
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)