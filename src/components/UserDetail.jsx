import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    currentUser, 
    currentUserLoading, 
    currentUserError, 
    fetchUser, 
    clearCurrentUser
  } = useUserStore();

  useEffect(() => {
    if (id) {
      fetchUser(id);
    }

    // Cleanup function to clear current user when component unmounts
    return () => {
      clearCurrentUser();
    };
  }, [id, fetchUser, clearCurrentUser]);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (currentUserLoading) {
    return (
      <div>
        <div>
          <div></div>
          <p>Loading user details...</p>
        </div>
      </div>
    );
  }

  if (currentUserError) {
    return (
      <div>
        <div>
          <h3>Error Loading User</h3>
          <p>{currentUserError}</p>
          <div>
            <button onClick={handleBack}>
              Go Back
            </button>
            <button onClick={() => fetchUser(id)}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div >
        <div>
          <h3>User Not Found</h3>
          <p>The user you're looking for doesn't exist.</p>
          <button onClick={handleBack} className="back-button">
            Go Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={handleBack} className="back-button">
          ← Back
        </button>
        <h1>User Details</h1>
      </div>
      <div>
        <div>
          <div>
            <h2>{currentUser.name?.firstname} {currentUser.name?.lastname}</h2>
            <p>@{currentUser.username}</p>
          </div>
        </div>

        <div>
          <div>
            <h3>Contact Information</h3>
            <div>
              <div>
                <strong>Email:</strong>
                {currentUser.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;