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
    fetch(
      `http://localhost:3001/user/login` ||
        `https://radiant-shore-82905.herokuapp.com/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response) {
          const { _id } = response;
          window.location.href =
            `http://localhost:3000/user/${_id}` ||
            `https://radiant-shore-82905.herokuapp.com/user/${_id}`;
        } else {
          window.location.href =
            `http://localhost:3000/` ||
            `https://radiant-shore-82905.herokuapp.com`;
        }
      });
  };
  const handleChange = (e) => {
    const { data } = e.nativeEvent;
    const { name } = e.target;
    switch (name) {
      case "username":
        data == null ? setUsername(username.slice(0,-1)) : setUsername(username + data);
        break;
      case "password":
        data == null ? setPassword(password.slice(0,-1)) : setPassword(password + data);
        break;
      default:
        console.log("nani"); 
        break;
    }
  };
  return (
    <div className="main">
      <div className="login">
        <div className="background"></div>
        <h1 className="formHeader">Login</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <h5>UserName</h5>
          <input
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Type your username"
          />
          <br />
          <h5>Password</h5>
          <input
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Type your password"
          />
          <br />
          <button type="submit" value="Submit">
            Login
          </button>
          <button className="anchorContainer">
            <a href="/signup">Signup</a>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
