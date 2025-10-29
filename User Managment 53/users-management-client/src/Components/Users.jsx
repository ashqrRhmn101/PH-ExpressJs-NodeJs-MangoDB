import React, { use } from "react";

const Users = ({ usersPromise }) => {
  const users = use(usersPromise);
  //   console.log(users);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    // console.log(name,email)
    const newUser = { name, email };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after Post", data);
      });
  };

  return (
    <div>
      <div>
        <h1>Users...</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" />
          <br />
          <input type="email" name="email" />
          <br />
          <button>Add user</button>
        </form>
      </div>
      {users.map((user) => (
        <p>
          {user.name} Email: {user.email}
        </p>
      ))}
    </div>
  );
};

export default Users;
