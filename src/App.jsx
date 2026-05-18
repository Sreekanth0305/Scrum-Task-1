import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import Loader from "./Loader";
import "./index.css";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const currentUser = users.find(
    (user) => user.id === selectedUser
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h2 className="error">{error}</h2>;
  }

  return (
    <div className="app">
      <h1>User Profile Card</h1>

      {/* User Switch Buttons */}
      <div className="button-container">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => setSelectedUser(user.id)}
            className={
              selectedUser === user.id ? "active-btn" : ""
            }
          >
            User {user.id}
          </button>
        ))}
      </div>

      {/* Reusable User Card */}
      {currentUser && <UserCard user={currentUser} />}
    </div>
  );
}

export default App;