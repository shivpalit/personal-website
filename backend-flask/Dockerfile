FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE ${PORT:-3001}

CMD gunicorn --bind 0.0.0.0:${PORT:-3001} flask-backend:app
