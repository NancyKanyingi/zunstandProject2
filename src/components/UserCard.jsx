import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <Link to={`/user/${user.id}`}>
      <div className="user-card">
        <div>
          <h3>@{user.username}</h3>
        </div>
        <div>
          <div>
            <div>
              <strong>Name:</strong> {user.name?.firstname} {user.name?.lastname}
            </div>
            <div>
              <strong>Email:</strong> 
              <span>{user.email}</span>
            </div>
          </div>
          <div>
            <span>View Details</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;