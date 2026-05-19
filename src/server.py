from flask import Flask, jsonify, request
from data import users

app = Flask(__name__)

# Default Route
@app.route('/')
def welcome():
    return jsonify({
        "status": "Backend API Working Successfully"
    })

# Fetch All Users
@app.route('/users', methods=['GET'])
def fetch_users():
    return jsonify({
        "total_users": len(users),
        "users": users
    })

# Fetch Single User
@app.route('/users/<int:user_id>', methods=['GET'])
def fetch_single_user(user_id):

    selected_user = None

    for user in users:
        if user["id"] == user_id:
            selected_user = user
            break

    if selected_user:
        return jsonify(selected_user)

    return jsonify({
        "message": "Invalid User ID"
    }), 404

# Add New User
@app.route('/users', methods=['POST'])
def create_user():

    request_data = request.get_json()

    # Required Fields
    required_data = ["name", "email", "role"]

    for item in required_data:
        if item not in request_data or request_data[item].strip() == "":
            return jsonify({
                "error": f"{item} field cannot be empty"
            }), 400

    added_user = {
        "id": len(users) + 1,
        "name": request_data["name"],
        "email": request_data["email"],
        "role": request_data["role"],
        "bio": request_data.get("bio", "No bio added"),
        "company": request_data.get("company", "Not Provided"),
        "website": request_data.get("website", "Not Available")
    }

    users.append(added_user)

    return jsonify({
        "success": True,
        "message": "New user created",
        "data": added_user
    }), 201

if __name__ == "__main__":
    app.run(debug=True, port=5001)