from flask import Flask, request
from chatbot import chattbot

app = Flask(__name__)

@app.route('/prueba')
def prueba():
    userText = request.args.get('msg')
    return str(chattbot.get_response(userText))

if __name__ == "__main__":
    app.run()