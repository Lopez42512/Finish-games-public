import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
// import Login from './component/login';
// import Signup from './component/signup';

function App() {
  const [game, setGame] = useState([]);
  const {id} = useParams();
  // get all the games from the server to populate the game cards
  useEffect(() => {
    
    console.log(id)
    try {
      fetch(`http://localhost:3001/games/${id}` || `https://radiant-shore-82905.herokuapp.com/games/${id}`)
        .then((res) => res.json())
        .then((response) => setGame(response));
    } catch (error) {
      console.log(error);
    }
  }, []);
  // handle the button click that deletes the desire game
  const handleDelete = (e) => {
    const {name} = e.target;
    try {
      fetch(`http://localhost:3001/games/${id}/${name}` || `https://radiant-shore-82905.herokuapp.com/games/${id}/${name}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: name
      })
      .then(res => res.json())
      .then(response => {
        // redirect back to home page after the game has been deleted
        console.log(id)
        window.location.href = `http://localhost:3000/user/${id}` || `https://radiant-shore-82905.herokuapp.com/user/${id}`
      })
    }
    catch(err) {
      console.log(err);
    }

  }
  // map through all the games that where pulled from the server and create a card for each
  const renderGame = game.map((game) => {
    return (
      <div key={game._id}>
        {game.image ? <img src={game.image} alt='no' style={{width:'100px', height:'100px'}}/>: <div></div>}
        <h1>{game.name}</h1>
        <h3>{game.system}</h3>
        <h3>{game.rating}</h3>
        <button onClick={handleDelete} name={game._id} value={game._id}>Delete {game.name}</button>
      </div>
    );
  });
  return (
    <div className="App">
      <a href={'http://localhost:3000' || `https://radiant-shore-82905.herokuapp.com/`}>Log out</a>
      <form action={`http://localhost:3001/games/${id}` || `https://radiant-shore-82905.herokuapp.com/games/${id}`} method="post">
        <label htmlFor="fname">Game Name</label>
        <input type="text" id="fname" name="name" />
        <label htmlFor="lname">System</label>
        <input type="text" id="lname" name="system" />
        <label htmlFor="lname">Rating</label>
        <input type="text" id="lname" name="rating" />
        <input type="submit" value="Submit" />
      </form>
      {renderGame}
      
    </div>
    )
}

export default App;
