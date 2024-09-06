import React, { useState, useEffect } from "react";
import axios from "axios";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/user").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleAddUser = () => {
    axios.post("http://localhost:5000/api/user", user).then(() => {
      setUsers([...users, user]);
    });
  };

  const handleDeleteUser = (id) => {
    axios.delete(`http://localhost:5000/api/user/${id}`).then(() => {
      setUsers(users.filter((u) => u.id !== id));
    });
  };

  return (
    <div>
      <h2>User Management</h2>
      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <button onClick={handleAddUser}>Add User</button>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email}){" "}
            <button onClick={() => handleDeleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
