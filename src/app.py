import os
from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

from api.routes import api
from api.models import db
from utils import APIException, generate_sitemap

load_dotenv()

app = Flask(__name__)
from flask_cors import CORS
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

app.config['DEBUG'] = True
app.config['ENV'] = os.getenv("FLASK_ENV", "development")
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://gitpod:postgres@localhost:5432/example'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "default-secret-key")

db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

@app.route('/')
def sitemap():
    return generate_sitemap(app)

@app.route("/api/hello")
def hello():
    return jsonify({ "message": "Servidor conectado correctamente." }), 200

app.register_blueprint(api, url_prefix='/api')

if __name__ == "__main__":
    print("Rutas registradas:", app.url_map)
    app.run(host="0.0.0.0", port=3001)
