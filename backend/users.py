from flask import Blueprint, jsonify, request
from data import users

user_routes = Blueprint("user_routes", __name__)

# GET all users
@user_routes.route("/users", methods=["GET"])
def get_users():
    return jsonify(users)

# ADD user
@user_routes.route("/users", methods=["POST"])
def add_user():

    new_user = request.json

    new_user["id"] = len(users) + 1

    users.append(new_user)

    return jsonify({
        "message": "User Added Successfully",
        "user": new_user
    })

# UPDATE user
@user_routes.route("/users/<int:id>", methods=["PUT"])
def update_user(id):

    updated_data = request.json

    for user in users:
        if user["id"] == id:
            user["name"] = updated_data["name"]
            user["role"] = updated_data["role"]
            user["email"] = updated_data["email"]

            return jsonify({
                "message": "User Updated Successfully",
                "user": user
            })

    return jsonify({"message": "User Not Found"}), 404

# DELETE user
@user_routes.route("/users/<int:id>", methods=["DELETE"])
def delete_user(id):

    for user in users:
        if user["id"] == id:
            users.remove(user)

            return jsonify({
                "message": "User Deleted Successfully"
            })

    return jsonify({"message": "User Not Found"}), 404