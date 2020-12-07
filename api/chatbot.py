from chatterbot import ChatBot
from chatterbot.comparisons import LevenshteinDistance
from chatterbot.response_selection import get_random_response
from chatterbot.trainers import ChatterBotCorpusTrainer
import logging

logging.basicConfig(level=logging.INFO)

chattbot = ChatBot(
    'WindowsBot',
    read_only = True,
    logic_adapters=[
        {
            'import_path': 'chatterbot.logic.SpecificResponseAdapter',
            'input_text': 'Necesito ayuda',
            'output_text': 'Si tiene algun problema especifico, puede entrar al siguiente link para pedir ayuda: https://www.windowsbot.com/help'
        }
        ,
        {
            'import_path': 'chatterbot.logic.BestMatch',
            'statement_comparison_function': 'chattebot.comparisons.JaccardSimilarity',
            'default_response' : 'No te entendí, vuelveme a preguntar algo',
            'maximum_similarity_threshold': 0.50
        }
    ]
)


trainer = ChatterBotCorpusTrainer(chattbot)
trainer.train("chatterbot.corpus.custom.myown")

