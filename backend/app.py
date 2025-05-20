from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="../frontend/dist", static_url_path="/")
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


@app.route('/')
def index():
    return send_from_directory(app.static_folder, "index.html")

from routes import *

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(port=5000)
