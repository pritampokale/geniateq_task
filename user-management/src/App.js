import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [user, setUser] = useState({ id: null, name: "", email: "" });
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://localhost:7073/api/user").then((response) => {
      setUsers(response.data);
      setFilteredUsers(response.data);
    });
  }, []);

  const handleAddUser = () => {
    if (editing) {
      axios.put(`https://localhost:7073/api/user/${user.id}`, user).then(() => {
        setUsers(users.map((u) => (u.id === user.id ? user : u)));
        setFilteredUsers(filteredUsers.map((u) => (u.id === user.id ? user : u)));
        setEditing(false);
        setUser({ id: null, name: "", email: "" });
      });
    } else {
      axios.post("https://localhost:7073/api/user", user).then((response) => {
        setUsers([...users, response.data]);
        setFilteredUsers([...filteredUsers, response.data]);
        setUser({ id: null, name: "", email: "" });
      });
    }
  };

  const handleDeleteUser = (id) => {
    axios.delete(`https://localhost:7073/api/user/${id}`).then(() => {
      setUsers(users.filter((u) => u.id !== id));
      setFilteredUsers(filteredUsers.filter((u) => u.id !== id));
    });
  };

  const handleEditUser = (user) => {
    setUser(user);
    setEditing(true);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">User Management</h2>
    
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <button className="btn btn-primary" onClick={handleAddUser}>
            {editing ? "Update User" : "Add User"}
          </button>
        </div>
      </div>


      <br></br>

      <div className="row mb-3">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      <ul className="list-group">
        {filteredUsers.map((u) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={u.id}>
            {u.name} ({u.email})
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditUser(u)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(u.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
