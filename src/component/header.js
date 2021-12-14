import React from "react";
import "../assets/css/app.css";

function Header() {
  return (
    <div className="Header">
      <h1>Completed Games</h1>
      <a
        className="logout"
        href={
          "http://localhost:3000" ||
          `https://radiant-shore-82905.herokuapp.com/`
        }
      >
        Log out
      </a>
    </div>
  );
}

export default Header;
