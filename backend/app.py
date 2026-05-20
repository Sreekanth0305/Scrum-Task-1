from flask import Flask
from flask_cors import CORS
from users import user_routes

app = Flask(__name__)

CORS(app)

app.register_blueprint(user_routes)

@app.route("/")
def home():
    return "User Management Backend Running"

if __name__ == "__main__":
    app.run(debug=True)