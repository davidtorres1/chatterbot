from flask import Flask, request
from chatbot import chatbot

app = Flask(__name__)

@app.route('/prueba')
def prueba():
    userText = request.args.get('msg')
    return str(chatbot.get_response(userText))