# from flask import Blueprint, jsonify, request
# from data import users

# user_routes = Blueprint("user_routes", __name__)

# # GET all users
# @user_routes.route("/users", methods=["GET"])
# def get_users():
#     return jsonify(users)

# # ADD user
# @user_routes.route("/users", methods=["POST"])
# def add_user():

#     new_user = request.json

#     new_user["id"] = len(users) + 1

#     users.append(new_user)

#     return jsonify({
#         "message": "User Added Successfully",
#         "user": new_user
#     })

# # UPDATE user
# @user_routes.route("/users/<int:id>", methods=["PUT"])
# def update_user(id):

#     updated_data = request.json

#     for user in users:
#         if user["id"] == id:
#             user["name"] = updated_data["name"]
#             user["role"] = updated_data["role"]
#             user["email"] = updated_data["email"]

#             return jsonify({
#                 "message": "User Updated Successfully",
#                 "user": user
#             })

#     return jsonify({"message": "User Not Found"}), 404

# # DELETE user
# @user_routes.route("/users/<int:id>", methods=["DELETE"])
# def delete_user(id):

#     for user in users:
#         if user["id"] == id:
#             users.remove(user)

#             return jsonify({
#                 "message": "User Deleted Successfully"
#             })

#     return jsonify({"message": "User Not Found"}), 404


from flask import Blueprint, jsonify, request
from database import get_db_connection

user_routes = Blueprint("user_routes", __name__)

# GET ALL USERS
@user_routes.route("/users", methods=["GET"])
def get_users():

    conn = get_db_connection()

    users = conn.execute(
        "SELECT * FROM users"
    ).fetchall()

    conn.close()

    return jsonify([dict(user) for user in users])


# GET SINGLE USER
@user_routes.route("/users/<int:id>", methods=["GET"])
def get_single_user(id):

    conn = get_db_connection()

    user = conn.execute(
        "SELECT * FROM users WHERE id = ?",
        (id,)
    ).fetchone()

    conn.close()

    if user is None:

        return jsonify({
            "error": "User Not Found"
        }), 404

    return jsonify(dict(user))


# ADD USER
@user_routes.route("/users", methods=["POST"])
def add_user():

    data = request.json

    if not data["name"] or not data["email"]:

        return jsonify({
            "error": "Name and Email are required"
        }), 400

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO users
        (name, email, role, bio, company, website)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        data["name"],
        data["email"],
        data["role"],
        data["bio"],
        data["company"],
        data["website"]
    ))

    conn.commit()

    conn.close()

    return jsonify({
        "message": "User Added Successfully"
    })


# UPDATE USER
@user_routes.route("/users/<int:id>", methods=["PUT"])
def update_user(id):

    data = request.json

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("""
        UPDATE users
        SET
            name = ?,
            email = ?,
            role = ?,
            bio = ?,
            company = ?,
            website = ?
        WHERE id = ?
    """, (
        data["name"],
        data["email"],
        data["role"],
        data["bio"],
        data["company"],
        data["website"],
        id
    ))

    conn.commit()

    conn.close()

    return jsonify({
        "message": "User Updated Successfully"
    })


# DELETE USER
@user_routes.route("/users/<int:id>", methods=["DELETE"])
def delete_user(id):

    conn = get_db_connection()

    conn.execute(
        "DELETE FROM users WHERE id = ?",
        (id,)
    )

    conn.commit()

    conn.close()

    return jsonify({
        "message": "User Deleted Successfully"
    })