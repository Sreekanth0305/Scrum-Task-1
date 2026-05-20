function UserCard({ user, deleteUser, setEditUser }) {

  return (
    <div className="card">

      <h2>{user.name}</h2>

      <p>{user.email}</p>

      <p>{user.role || "Developer"}</p>

      <div className="btn-group">

        <button onClick={() => setEditUser(user)}>
          Edit
        </button>

        <button onClick={() => deleteUser(user.id)}>
          Delete
        </button>

      </div>

    </div>
  );
}

export default UserCard;