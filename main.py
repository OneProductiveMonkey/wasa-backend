from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

bot_status = {"active": False}
log = []

@app.route("/")
def index():
    return "WasaBot backend is running"

@app.route("/start-bot", methods=["POST"])
def start_bot():
    bot_status["active"] = True
    log.append("Bot startad.")
    return jsonify({"status": "started"})

@app.route("/stop-bot", methods=["POST"])
def stop_bot():
    bot_status["active"] = False
    log.append("Bot stoppad.")
    return jsonify({"status": "stopped"})

@app.route("/status", methods=["GET"])
def get_status():
    return jsonify({"active": bot_status["active"]})

@app.route("/log", methods=["GET"])
def get_log():
    return jsonify(log[-50:])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
