import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userStore } from "../store/userStore";
import axios from "axios";

const baseURL = "http://localhost:4000/users";

function UserDetail() {
  const { id } = useParams();
  const { users, fetchUsers } = userStore();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existing = users.find(u => u.id === Number(id));
    if (existing) {
      setUser(existing);
      setLoading(false);
    } else {
      // Fetch user directly from API if not in store
      axios.get(`${baseURL}/${id}`)
        .then(res => setUser(res.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id, users]);

  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="user-detail">
      <h2>{user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Name: {user.name.firstname} {user.name.lastname}</p>

      <div className="card-buttons">
        <Link to={`/edit/${user.id}`} className="btn edit">Edit</Link>
        <Link to="/" className="btn view">Back</Link>
      </div>
    </div>
  );
}

export default UserDetail;
