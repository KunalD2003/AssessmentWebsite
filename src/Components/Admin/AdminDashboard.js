// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Function to fetch all logged-in users
    const fetchLoggedInUsers = async () => {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch('http://localhost:3000/api/admin/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data.users);
    };

    fetchLoggedInUsers();

    // Set up interval to update user status periodically
    const interval = setInterval(fetchLoggedInUsers, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {users.map((user) => (
          <li key={user.uid}>
            {user.email} - {user.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
