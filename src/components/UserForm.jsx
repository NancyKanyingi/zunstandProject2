import React from "react";
import useUserStore from "../store/userStore";

const UserForm = () => {
  const { createUser } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    //create user
    //update user
    
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData);
    createUser(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit">Add User</button>
    </form>
  );
};
 
export default UserForm;