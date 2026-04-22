from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)
N8N_WEBHOOK_URL = "http://localhost:5678/webhook/check-eligibility" 

@app.route('/api/check-eligibility', methods=['POST'])
def check_eligibility():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    try:
        response = requests.post(N8N_WEBHOOK_URL, json=data)
        response.raise_for_status() 
        return jsonify(response.json())

    except requests.exceptions.RequestException as e:
        print(f"HTTP Error communicating with n8n: {e}")
        return jsonify({
            "error": "Failed to connect to n8n workflow", 
            "details": str(e)
        }), 502
    except ValueError:
        print("n8n did not return valid JSON")
        return jsonify({
            "error": "Invalid response format from n8n", 
            "details": response.text
        }), 502
    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({"error": "Failed to process request", "details": str(e)}), 500

if __name__ == '__main__':
    app.run()
