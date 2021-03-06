import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./component/header";
import './assets/css/app.css'
// import Login from './component/login';
// import Signup from './component/signup';

function App() {
  const [game, setGame] = useState([]);
  const { id } = useParams();
  // get all the games from the server to populate the game cards
  useEffect(() => {
    try {
      fetch(
        `http://localhost:3001/games/${id}` ||
          `https://radiant-shore-82905.herokuapp.com/games/${id}`
      )
        .then((res) => res.json())
        .then((response) => setGame(response));
    } catch (error) {
      console.log(error);
    }
  }, []);
  // handle the button click that deletes the desire game
  const handleDelete = (e) => {
    const { name } = e.target;
    try {
      fetch(
        `http://localhost:3001/games/${id}/${name}` ||
          `https://radiant-shore-82905.herokuapp.com/games/${id}/${name}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "text/plain",
          },
          body: name,
        }
      )
        .then((res) => res.json())
        .then((response) => {
          // redirect back to home page after the game has been deleted
          console.log(id);
          window.location.href =
            `http://localhost:3000/user/${id}` ||
            `https://radiant-shore-82905.herokuapp.com/user/${id}`;
        });
    } catch (err) {
      console.log(err);
    }
  };
  // map through all the games that where pulled from the server and create a card for each
  const renderGame = game.map((game) => {
    return (
      <div className="gameCards" key={game._id}>
        {game.image ? (
          <img
            src={game.image}
            alt="no"
          />
        ) : (
          <div></div>
        )}
        <h1>{game.name}</h1>
        <h3>Console: {game.system}</h3>
        <h3>Rating: {game.rating}</h3>
        <button onClick={handleDelete} name={game._id} value={game._id}>
          Delete {game.name}
        </button>
      </div>
    );
  });
  console.log(renderGame)
  renderGame ? renderGame.reverse() : <div></div>
  return (
    <div className="appContainer">
      <Header />
      
      <form
        action={
          `http://localhost:3001/games/${id}` ||
          `https://radiant-shore-82905.herokuapp.com/games/${id}`
        }
        method="post"
        id="formContainer"
      >
        <label htmlFor="fname">Game Name</label>
        <input type="text" id="fname" name="name" />
        <label htmlFor="lname">System</label>
        <input type="text" id="lname" name="system" />
        <label htmlFor="lname">Rating</label>
        <input type="text" id="lname" name="rating" />
        <input type="submit" value="Submit" />
      </form>
      <div className="gameContainer">{renderGame}</div>
    </div>
  );
}

export default App;
