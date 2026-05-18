function UserCard({ user }) {
  return (
    <div className="card">
      <h2>{user.name}</h2>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Company:</strong> {user.company.name}
      </p>

      <p>
        <strong>Website:</strong>{" "}
        <a
          href={`https://${user.website}`}
          target="_blank"
          rel="noreferrer"
        >
          {user.website}
        </a>
      </p>
    </div>
  );
}

export default UserCard;