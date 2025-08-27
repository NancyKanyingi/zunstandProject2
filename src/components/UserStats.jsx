import React from 'react';
import useUserStore from '../store/userStore';

const UserStats = () => {
  const { users, loading } = useUserStore();

  if (loading) {
    return <div>Loading stats...</div>;
  }

  return (
    <div>
      <h3>User Statistics</h3>
      <p>Total Users: {users.length}</p>
      <p>Active Users: {users.filter(user => user.active !== false).length}</p>
    </div>
  );
};

export default UserStats;