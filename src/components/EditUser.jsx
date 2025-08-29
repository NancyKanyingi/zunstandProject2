import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userStore } from "../store/userStore";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, updateUser } = userStore();

  const existing = users.find((u) => u.id === Number(id));
  const [form, setForm] = useState({
    username: existing?.username || "",
    email: existing?.email || "",
    firstname: existing?.name?.firstname || "",
    lastname: existing?.name?.lastname || "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const updatedUser = {
      ...existing,
      username: form.username,
      email: form.email,
      name: { firstname: form.firstname, lastname: form.lastname },
    };
    updateUser(existing.id, updatedUser);
    navigate(`/users/${existing.id}`);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Edit User</h2>
      <input name="username" value={form.username} onChange={handleChange} required />
      <input name="email" value={form.email} onChange={handleChange} required />
      <input name="firstname" value={form.firstname} onChange={handleChange} />
      <input name="lastname" value={form.lastname} onChange={handleChange} />
      <button type="submit" className="btn">Save</button>
    </form>
  );
}

export default EditUser;
