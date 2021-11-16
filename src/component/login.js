import React, { useState, useEffect } from "react";
import { Routes, Route, link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    fetch(`https://radiant-shore-82905.herokuapp.com/user/login`, {
      method: "POST",
      headers: {
        "access-control-allow-origin" : "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response) {
          const { _id } = response;
          window.location.href = `http://localhost:3000/user/${_id}` || `https://radiant-shore-82905.herokuapp.com/user/${_id}`;
        } else {
          window.location.href = `http://localhost:3000/` || `https://radiant-shore-82905.herokuapp.com`;
        }
      });
  };
  const handleChange = (e) => {
    const { data } = e.nativeEvent;
    const { name } = e.target;
    switch (name) {
      case "username":
        setUsername(username + data);
        break;
      case "password":
        setPassword(password + data);
        break;
      default:
        console.log("nani");
        break;
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>UserName</label>
        <input name="username" value={username} onChange={handleChange} />
        <br />
        <label>Password</label>
        <input name="password" value={password} onChange={handleChange} />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <a href="/signup">Signup</a>
    </div>
  );
}

export default Login;
