import React from "react";
import { MdHome } from "react-icons/md"

export default function Navbar(props) {

  function handleClickHome() {
    props.handleGoHome()
  }

  function handleClickDeckName() {
    props.handleGoToDeck()
  }

  return (
    <div className="navbar">
      <MdHome onClick={handleClickHome} className="navbar--home-icon" />
      {props.handleOnHomePage ? <h1 className="title">Flashcard App</h1>
      : <h1 onClick={handleClickDeckName} className="title clickable">{props.deckName}</h1>}
    </div>
  );
}
