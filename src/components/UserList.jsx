import { useEffect } from "react";
import { Link } from "react-router-dom";
import { userStore } from "../store/userStore";
import UserCard from "./UserCard";

function UserList() {
  const { users, fetchUsers, loading, error } = userStore();

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Users</h1>
      <Link to="/add" className="btn add">➕ Add User</Link>
      <div className="grid">
        {users.map(user => <UserCard key={user.id} user={user} />)}
      </div>
    </div>
  );
}

export default UserList;
