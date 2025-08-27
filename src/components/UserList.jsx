import React, { useEffect } from 'react';
import useUserStore from '../store/userStore';
import UserCard from './UserCard';

const UserList = () => {
  // Subscribe to the store state and actions
  const { users, loading, error, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return (
      <div>
       <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div>
          <h3>Error Loading Users</h3>
          <p>{error}</p>
          <button onClick={fetchUsers}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>User Directory</h2>
        <div>
          <span >{users.length} users found</span>
          <button onClick={fetchUsers} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {users.length === 0 ? (
        <div>
          <p>No users available.</p>
        </div>
      ) : (
        <div>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;