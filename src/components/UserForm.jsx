import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userStore } from "../store/userStore";
import axios from "axios";

const baseURL = "http://localhost:4000/users";

function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, createUser, updateUser } = userStore();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: ""
  });
  const [loading, setLoading] = useState(true);

  // Load user data if editing
  useEffect(() => {
    const existing = users.find(u => u.id === Number(id));
    if (existing) {
      setForm({
        username: existing.username,
        email: existing.email,
        password: existing.password,
        firstname: existing.name.firstname,
        lastname: existing.name.lastname
      });
      setLoading(false);
    } else if (id) {
      // Fetch from API if not in store
      axios.get(`${baseURL}/${id}`)
        .then(res => {
          setForm({
            username: res.data.username,
            email: res.data.email,
            password: res.data.password,
            firstname: res.data.name.firstname,
            lastname: res.data.name.lastname
          });
        })
        .catch(err => console.error("Failed to load user:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false); // Adding new user
    }
  }, [id, users]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username: form.username,
      email: form.email,
      password: form.password,
      name: { firstname: form.firstname, lastname: form.lastname }
    };

    try {
      if (id) {
        await updateUser(Number(id), userData);
      } else {
        await createUser(userData);
      }
      navigate("/");
    } catch (err) {
      console.error("Failed to save user:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>{id ? "Edit User" : "Add User"}</h2>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          name="firstname"
          placeholder="First Name"
          value={form.firstname}
          onChange={handleChange}
        />
        <input
          name="lastname"
          placeholder="Last Name"
          value={form.lastname}
          onChange={handleChange}
        />

        <button type="submit" className="btn add">
          {id ? "Save Changes" : "Add User"}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
