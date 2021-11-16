import React, { useState, useEffect } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [createdUser, setCreatedUser] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(email, username, password)
    const data = {
      email: email,
      username: username,
      password: password,
    };
    console.log(data);
    try {
      fetch(`http://localhost:3001/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          if (response === "user created") {
            setCreatedUser(false)
            window.location.href = "http://localhost:3000";
          } else {
              setCreatedUser(true)
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    const { data } = e.nativeEvent;
    const { name } = e.target;
    switch (name) {
      case "email":
        setEmail(email + data);
        break;
      case "username":
        setUsername(username + data);
        break;
      case "password":
        setPassword(password + data);
        break;
      default:
        console.log("nani");
    }
  };
  const userAlarm = <h1>User already exist please login or try another email</h1>
  return (
    <div>
        {createdUser ? userAlarm: ''}
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input name="email" value={email} onChange={handleChange} />
        <br />
        <label>UserName</label>
        <input name="username" value={username} onChange={handleChange} />
        <br />
        <label>Password</label>
        <input name="password" value={password} onChange={handleChange} />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <a href="/">Login</a>
    </div>
  );
}

export default Signup;
