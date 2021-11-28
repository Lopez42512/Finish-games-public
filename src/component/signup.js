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
      fetch(
        `http://localhost:3001/user/signup` ||
          `https://radiant-shore-82905.herokuapp.com//user/signup`,
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
          console.log(response);
          if (response === "user created") {
            setCreatedUser(false);
            window.location.href =
              `http://localhost:3000` ||
              "https://secret-refuge-52878.herokuapp.com/";
          } else {
            setCreatedUser(true);
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
  const userAlarm = (
    <h1>User already exist please login or try another email</h1>
  );
  return (
    <div className="main">
      <div className="login">
        <div className="background"></div>
        {createdUser ? userAlarm : ""}
        <h1 className="formHeader">Sign Up</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <h5>Email</h5>
          <input
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Type your email"
          />
          <br />
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
              Signup
            </button>
            <button className="anchorContainer">
              <a href="/">Login</a>
            </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
