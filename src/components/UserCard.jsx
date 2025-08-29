import { Link } from "react-router-dom";
import { userStore } from "../store/userStore";

function UserCard({ user }) {
  const deleteUser = userStore(state => state.deleteUser);

  const handleDelete = async () => {
  const userId = Number(user.id); // Ensure it's a number
  console.log("Deleting user with ID:", userId); // Debug
  if (window.confirm(`Are you sure you want to delete ${user.username}?`)) {
    try {
      await deleteUser(userId);
      console.log("Deleted successfully:", userId);
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  }
};


  return (
    <div className="user-card">
      <h3>{user.username}</h3>
      <p>Email: {user.email}</p>
      <p>{user.name.firstname} {user.name.lastname}</p>

      <div className="card-buttons">
        <Link to={`/users/${user.id}`} className="btn view">View</Link>
        <Link to={`/edit/${user.id}`} className="btn edit">Edit</Link>
        <button onClick={handleDelete} className="btn delete">Delete</button>
      </div>
    </div>
  );
}

export default UserCard;
