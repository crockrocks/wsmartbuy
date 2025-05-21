from flask import Flask, request, jsonify
from flask_cors import CORS
import mongo
from scraper import EcommerceScraper
import requests
import json
from typing import List, Dict
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize the scraper
scraper = EcommerceScraper()

def clean_price_string(price_str: str) -> float:
    cleaned = price_str.replace('₹', '').replace(',', '').strip()
    try:
        return float(cleaned)
    except ValueError:
        return 0.0

def scrape_clothing_items(query: str, page: int = 1, user_id: str = None) -> List[Dict]:
    try:
        items = scraper.scrape_items(query, page, user_id)
        return items
    except Exception as e:
        print(f"Error scraping items: {str(e)}")
        return []

@app.route('/api/clothing', methods=['GET'])
def get_clothing_items():
    query = request.args.get('query', 'clothing')
    category = request.args.get('category', 'all')
    page = int(request.args.get('page', 1))
    user_id = request.args.get('user_id')  # Get user_id from query parameters
    
    try:
        items = scrape_clothing_items(query, page, user_id)
        if category != 'all':
            items = [item for item in items if item['category'] == category]
        
        return jsonify({
            "success": True,
            "items": items,
            "page": page,
            "has_more": len(items) == 20
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required"}), 400
    
    success, result = mongo.register_user(email, password)
    
    if success:
        return jsonify({"success": True, "user_id": result}), 201
    else:
        return jsonify({"success": False, "message": result}), 400

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required"}), 400
    
    success, result = mongo.authenticate_user(email, password)
    
    if success:
        return jsonify({"success": True, "user_id": result}), 200
    else:
        return jsonify({"success": False, "message": result}), 401

@app.route('/api/preferences', methods=['POST'])
def save_preferences():
    data = request.get_json()
    user_id = data.get('user_id')
    
    if not user_id:
        return jsonify({"success": False, "message": "User ID is required"}), 400
    
    preferences_data = {k: v for k, v in data.items() if k != 'user_id'}
    
    success = mongo.save_preferences(user_id, preferences_data)
    
    if success:
        return jsonify({"success": True}), 200
    else:
        return jsonify({"success": False, "message": "Failed to save preferences"}), 500

@app.route('/api/preferences/<user_id>', methods=['GET'])
def get_preferences(user_id):
    preferences = mongo.get_preferences(user_id)
    
    if preferences:
        return jsonify({"success": True, "preferences": preferences}), 200
    else:
        return jsonify({"success": False, "message": "No preferences found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000) 