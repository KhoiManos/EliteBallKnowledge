from flask import Flask, render_template, request
from eliteBallKnowledge import findMatch
from gpt_request import expand_sentence_butThreaded



app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/translate", methods=["POST"])
def translate():
    user_input = request.form["textInput"]

    substitution = findMatch(user_input)

    result = expand_sentence_butThreaded(substitution)
    
    return render_template("translated.html", original=user_input, translated=result)

if __name__ == "__main__":
    app.run(debug=True)

