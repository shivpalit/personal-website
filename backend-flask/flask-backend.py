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
import time
from openai import OpenAI

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Docs
SYSTEM_PROMPT = open('src/AssistantPrompt.md', 'r').read()

#AI
AI_CLIENT = OpenAI(api_key=os.getenv('OPENAI_KEY'))

# ─── Configuration ─────────────────────────────────────────────
WINDOW_SIZE            = 15 * 60        # 15 minutes in seconds
MAX_15M_REQUESTS       = 15             # per-IP sliding window
MAX_IP_DAILY_REQUESTS  = 20           # per-IP calendar day
MAX_GLOBAL_DAILY_REQS  = 200           # global calendar day across all IPs

# ─── In-memory logs ────────────────────────────────────────────
request_log_15m   = defaultdict(list)   # ip → [timestamps…]
request_log_ipday = defaultdict(list)   # ip → [timestamps…]
global_log_day    = []                  # [timestamps…] for all IPs today

def rate_limiter():
    ip  = request.remote_addr
    now = datetime.now()

    # 1) Prune your per-IP 15m log
    cutoff_15m = now - timedelta(seconds=WINDOW_SIZE)
    request_log_15m[ip] = [ts for ts in request_log_15m[ip] if ts > cutoff_15m]

    # 2) Prune your per-IP daily log (keep only today’s entries)
    request_log_ipday[ip] = [ts for ts in request_log_ipday[ip] if ts.date() == now.date()]

    # 3) Prune your global daily log (only keep today’s)
    global_log_day[:] = [ts for ts in global_log_day if ts.date() == now.date()]

    # 4) Check per-IP 15-minute limit
    if len(request_log_15m[ip]) >= MAX_15M_REQUESTS:
        return jsonify({
            'response': 'Too many requests in 15 minutes. Try again shortly.'
        }), 429

    # 5) Check per-IP daily limit
    if len(request_log_ipday[ip]) >= MAX_IP_DAILY_REQUESTS:
        return jsonify({
            'response': 'You’ve hit your daily limit. Please try again tomorrow.'
        }), 429

    # 6) Check global daily limit
    if len(global_log_day) >= MAX_GLOBAL_DAILY_REQS:
        return jsonify({
            'response': 'Service is busy today. Please try again tomorrow.'
        }), 429

    # 7) All clear → record this request in all logs
    request_log_15m[ip].append(now)
    request_log_ipday[ip].append(now)
    global_log_day.append(now)

    # continue processing…
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
    

def get_ai_response(history,input):
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    for m in history:
        if m['type'] == 'user':
            messages.append({"role": "user", "content": m['message']}) 
        elif m['type'] == 'bot':
            messages.append({"role": "assistant", "content": m['message']})

    messages.append({"role": "user", "content": input})

    response = AI_CLIENT.chat.completions.create(model="gpt-4o", messages=messages)

    return response.choices[0].message.content
    

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

@app.route('/api/ai-response', methods=['POST'])
def ai_response():
    rate_limit_response = rate_limiter()
    if rate_limit_response:
        return rate_limit_response
    
    data = request.get_json()
    messages = data.get('messages')
    input = data.get('input')
    response = get_ai_response(messages,input)
    return jsonify({'response': response})

if __name__ == '__main__':
    port = int(os.getenv('PORT', 3001))
    app.run(host='0.0.0.0', port=port)
