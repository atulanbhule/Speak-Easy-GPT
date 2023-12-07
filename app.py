from flask import Flask, render_template, request, jsonify
import openai
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Set up your OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

# Route to serve the HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Endpoint to handle OpenAI API request
@app.route('/api', methods=['POST'])
def openai_api():
    try:
        # Get user input from the request
        user_input = request.json['input']

        # Make a request to the OpenAI API
        response = openai.Completion.create(
            engine="text-davinci-003",  # You can choose a different engine
            prompt=user_input,
            max_tokens=150,
        )

        # Extract the generated text from the OpenAI response
        generated_text = response['choices'][0]['text'].strip()

        # Return the generated text as JSON
        return jsonify({'message': generated_text})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

