from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import boto3
import os
from dotenv import load_dotenv
import re
from collections import defaultdict
from typing import Dict, List
import requests
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Rate limiting configuration
WINDOW_SIZE = 15 * 60  # 15 minutes in seconds
MAX_REQUESTS = 15
request_log: Dict[str, List[datetime]] = defaultdict(list)

def rate_limiter():
    ip = request.remote_addr
    now = datetime.now()
    
    # Clean up old requests
    request_log[ip] = [time for time in request_log[ip] 
                      if now - time < timedelta(seconds=WINDOW_SIZE)]
    
    # Check if too many requests
    if len(request_log[ip]) >= MAX_REQUESTS:
        return jsonify({
            'error': 'Too many requests. Please try again later.'
        }), 429
    
    request_log[ip].append(now)
    return None

def send_email(contact_data):
    try:
        ses = boto3.client(
            'ses',
            region_name=os.getenv('AWS_REGION'),
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
        )
        
        response = ses.send_email(
            Source="Contact Form <contact@shivpalit.com>",
            Destination={
                'ToAddresses': ['shivpalit@gmail.com']
            },
            Message={
                'Subject': {
                    'Data': f"New Contact Form Submission from {contact_data['name']}"
                },
                'Body': {
                    'Text': {
                        'Data': f"Name: {contact_data['name']}\n\n"
                               f"Email: {contact_data['email']}\n\n"
                               f"Message:\n{contact_data['message']}"
                    }
                }
            }
        )
        return {'success': True, 'messageId': response['MessageId']}
    except Exception as error:
        print(f"Error sending email: {str(error)}")
        return {'success': False, 'error': str(error)}
    
def to_title_case(name):
    words = name.replace('-', ' ').split()
    return ' '.join(word.capitalize() for word in words)

def get_gh_repos(username):
    url = f"https://api.github.com/users/{username}/repos"
    params = {
        'sort': 'updated',
        'per_page': 100,
        'type': 'owner'
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        repos = response.json()
        return [{
            'name': repo['name'],
            'clean_name': to_title_case(repo['name']),
            'description': repo['description'],
            'html_url': repo['html_url'],
            'language': repo['language'],
            'stars': repo['stargazers_count'],
            'updated_at': repo['updated_at']
        } for repo in repos]
    else:
        return None
    

@app.route('/api/health', methods=['GET'])
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})

@app.route('/api/contact', methods=['POST'])
def contact():
    # Check rate limit
    rate_limit_response = rate_limiter()
    if rate_limit_response:
        return rate_limit_response
    
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    
    # Basic validation
    if not all([name, email, message]):
        return jsonify({
            'error': 'Please provide name, email, and message'
        }), 400
    
    # Email validation
    email_regex = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')
    if not email_regex.match(email):
        return jsonify({
            'error': 'Please provide a valid email address'
        }), 400
    
    try:
        result = send_email({
            'name': name,
            'email': email,
            'message': message
        })
        
        if result['success']:
            return jsonify({'message': 'Email sent successfully'})
        else:
            return jsonify({'error': result['error']}), 500
            
    except Exception as e:
        print('Server error:', str(e))
        return jsonify({
            'error': 'Failed to send email. Please try again later.'
        }), 500

@app.route('/api/gh-repos', methods=['POST'])
def gh_repos():
    data = request.get_json()
    username = data.get('username')
    repos = get_gh_repos(username)
    return jsonify({'repos': repos})


if __name__ == '__main__':
    port = int(os.getenv('PORT', 3001))
    app.run(host='0.0.0.0', port=port)
