// function UserCard({ user, deleteUser, setEditUser }) {

//   return (
//     <div className="card">

//       <h2>{user.name}</h2>

//       <p>{user.email}</p>

//       <p>{user.role || "Developer"}</p>

//       <div className="btn-group">

//         <button onClick={() => setEditUser(user)}>
//           Edit
//         </button>

//         <button onClick={() => deleteUser(user.id)}>
//           Delete
//         </button>

//       </div>

//     </div>
//   );
// }

// export default UserCard;

function UserCard({
  user,
  deleteUser,
  setEditingUser
}) {

  return (
    <div className="user-card">

      <h2>{user.name}</h2>

      <p>
        <strong>Email:</strong>
        {" "}
        {user.email}
      </p>

      <p>
        <strong>Role:</strong>
        {" "}
        {user.role}
      </p>

      <p>
        <strong>Company:</strong>
        {" "}
        {user.company}
      </p>

      <p>
        <strong>Website:</strong>
        {" "}
        {user.website}
      </p>

      <div className="btn-group">

        <button
          onClick={() =>
            setEditingUser(user)
          }
        >
          Edit
        </button>

        <button
          onClick={() =>
            deleteUser(user.id)
          }
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default UserCard;