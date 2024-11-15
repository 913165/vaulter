'use client';


import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function UsersList(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users from an API or other source
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}