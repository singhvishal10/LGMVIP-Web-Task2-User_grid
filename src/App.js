import React, { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://reqres.in/api/users?page=1');
      const data = await response.json();
      setUsers(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error Fetching users", error);
      setLoading(false);
    }
  };
  return (
    <div className="app">
      <nav className="navbar">
        <h1>Simon Brand</h1>
          <button className="button" onClick={fetchUsers} disabled={loading}>
            {loading ? "Loading...." : "Get Users"}
          </button>
      </nav>
      <div className="user-cards">
        {loading ? (
          <p>Loading....</p>
        ) : (
          users &&
          users.map(user => (
            <div className="user-card" key={user.id}>
              <img src={user.avatar} alt="${user.first_name} ${user.last_name}"/>
              <h3>
                {user.first_name} ${user.last_name}
              </h3>
              <p>{user.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
