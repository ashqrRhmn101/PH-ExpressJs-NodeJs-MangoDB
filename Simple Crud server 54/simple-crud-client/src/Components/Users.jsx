import React, { use, useState } from "react";
import { Link } from "react-router";
// import { data } from "react-router";

const Users = ({ userPromise }) => {
  const initialUsers = use(userPromise);
  const [users, setUsers] = useState(initialUsers);
  //   console.log(users);

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);

    const newUser = { name, email };
    // save ths user data to the database ( via server)
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After Saving Data ", data);
        if (data.insertedId) {
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUsers(newUsers);
          alert("success add user");
          e.target.reset();
        }
      });
  };

  // handleDeleteUser
  const handleDeleteUser = (id) => {
    console.log("Click", id);
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("delete ", data);
        if (data.deletedCount) {
          alert("Delate successfully");
          const remaining = users.filter((user) => user._id !== id);
          setUsers(remaining);
        }
      });
  };

  return (
    <div>
      <h2>Users : {users.length}</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>

      <p>..........UI...........</p>
      <div>
        {users.map((user) => (
          <div key={user._id}>
            {user.name} == {user.email}
            <Link to={`/users/${user._id}`}>Details</Link> <br />
            <Link to={`/update/${user._id}`}>Edit</Link> <br />
            <button onClick={() => handleDeleteUser(user._id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
