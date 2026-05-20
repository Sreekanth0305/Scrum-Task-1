import { useEffect, useState } from "react";

function UserForm({ addUser, updateUser, editUser }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  });

  useEffect(() => {

    if (editUser) {

      setFormData(editUser);
    }

  }, [editUser]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (editUser) {

      updateUser(formData);

    } else {

      addUser(formData);
    }

    setFormData({
      name: "",
      email: "",
      role: ""
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="role"
        placeholder="Enter Role"
        value={formData.role}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {editUser ? "Update User" : "Add User"}
      </button>

    </form>
  );
}

export default UserForm;