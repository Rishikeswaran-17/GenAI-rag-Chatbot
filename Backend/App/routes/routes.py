from flask import request, jsonify
import requests
from App import app
from App.cbfs import cb
from config import *

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    query = data["query"]
    chat_history = []

    response = cb.convchain(query, chat_history, cb.qa)

    response["query"] = query

    # Send the response to the Node.js server using requests.post()
    nodejs_server_url = NODEJS_SERVER_URL  # Assuming NODEJS_SERVER_URL is defined in config.py
    nodejs_response = requests.post(nodejs_server_url, json=response)

    print("Response from convchain:", response)

    return jsonify(response)
