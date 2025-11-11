#!/usr/bin/env python3
"""
StarFolk API Server - Python/Flask version
Serves character data from api/data/characters.json
"""

import json
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Path to characters data
DATA_PATH = os.path.join(os.path.dirname(__file__), 'data', 'characters.json')
characters = []

def load_data():
    """Load characters from JSON file"""
    global characters
    try:
        with open(DATA_PATH, 'r', encoding='utf-8') as f:
            characters = json.load(f)
        print(f"Loaded {len(characters)} characters")
    except Exception as err:
        print(f"Failed to load data: {err}")
        characters = []

load_data()

@app.route('/api/characters', methods=['GET'])
def get_characters():
    """GET /api/characters?search=foo"""
    q = request.args.get('search', '').strip().lower()
    if not q:
        q = ''  # Return all characters if no search query provided
    
    results = [
        c for c in characters 
        if q in c.get('name', '').lower()
    ]
    return jsonify(results)

@app.route('/api/characters/featured', methods=['GET'])
def get_featured():
    """GET /api/characters/featured - Return characters marked as featured"""
    results = [c for c in characters if c.get('featured', False)]
    return jsonify(results)

@app.route('/api/characters/<int:char_id>', methods=['GET'])
def get_character(char_id):
    """GET /api/characters/:id"""
    c = next((ch for ch in characters if ch.get('id') == char_id), None)
    if not c:
        return jsonify({'error': 'Not found'}), 404
    return jsonify(c)

@app.route('/api/__reload', methods=['POST'])
def reload_data():
    """POST /api/__reload - Reload data from file (dev endpoint)"""
    load_data()
    return jsonify({'ok': True, 'count': len(characters)})

if __name__ == '__main__':
    port = int(os.environ.get('API_PORT', 4000))
    print(f"API server running on http://localhost:{port}")
    app.run(debug=False, host='localhost', port=port)
