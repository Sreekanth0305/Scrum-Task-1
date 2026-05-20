// import { useEffect, useState } from "react";
// import UserCard from "./UserCard";
// import Loader from "./Loader";
// import "./index.css";

// function App() {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(1);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch users");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setUsers(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   const currentUser = users.find(
//     (user) => user.id === selectedUser
//   );

//   if (loading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <h2 className="error">{error}</h2>;
//   }

//   return (
//     <div className="app">
//       <h1>User Profile Card</h1>

//       {/* User Switch Buttons */}
//       <div className="button-container">
//         {users.map((user) => (
//           <button
//             key={user.id}
//             onClick={() => setSelectedUser(user.id)}
//             className={
//               selectedUser === user.id ? "active-btn" : ""
//             }
//           >
//             User {user.id}
//           </button>
//         ))}
//       </div>

//       {/* Reusable User Card */}
//       {currentUser && <UserCard user={currentUser} />}
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import UserForm from "./components/UserForm";

function App() {

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");

  const [editUser, setEditUser] = useState(null);

  const API = "https://jsonplaceholder.typicode.com/users";

  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const response = await axios.get(API);

      setUsers(response.data);

    } catch (error) {

      console.log(error);

      setMessage("Failed to Fetch Users");

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchUsers();

  }, []);

  // ADD USER
  const addUser = async (userData) => {

    try {

      const response = await axios.post(API, userData);

      setUsers([...users, response.data]);

      setMessage("User Added Successfully");

    } catch (error) {

      console.log(error);

    }
  };

  // DELETE USER
  const deleteUser = (id) => {

    const filteredUsers = users.filter((user) => user.id !== id);

    setUsers(filteredUsers);

    setMessage("User Deleted Successfully");
  };

  // UPDATE USER
  const updateUser = (updatedData) => {

    const updatedUsers = users.map((user) =>
      user.id === editUser.id ? updatedData : user
    );

    setUsers(updatedUsers);

    setEditUser(null);

    setMessage("User Updated Successfully");
  };

  // SEARCH FILTER
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <Navbar />

      <div className="container">

        <h1>User Management Dashboard</h1>

        {message && <p className="message">{message}</p>}

        <SearchBar search={search} setSearch={setSearch} />

        <UserForm
          addUser={addUser}
          updateUser={updateUser}
          editUser={editUser}
        />

        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div className="user-grid">

            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                deleteUser={deleteUser}
                setEditUser={setEditUser}
              />
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default App;