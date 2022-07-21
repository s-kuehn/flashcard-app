import React from "react";
import CardList from "./CardList";

export default function AddCard(props) {

  const [frontCardText, setFrontCardText] = React.useState('');
  const [backCardText, setBackCardText] = React.useState('');
  
  function handleClick() {
    if(frontCardText.trim().length > 0 && backCardText.trim().length > 0) {
      props.handleAddCard(frontCardText, backCardText);
      setFrontCardText('');
      setBackCardText('');
    }
  }

  function handleFrontCardText(event) {
    setFrontCardText(event.target.value);
  }

  function handleBackCardText(event) {
    setBackCardText(event.target.value);
  }

  return (
    <>
      <div className="add-card">
          <input onChange={handleFrontCardText} className="add-card--front" value={frontCardText} autoFocus type="text" placeholder="Front text here" />
          <input onChange={handleBackCardText}className="add-card--back" value={backCardText} type="text" placeholder="Back text here" />
          <button onClick={handleClick} className="add-card--button" >Add Card!</button>
      </div>
      <CardList cards={props.cards} handleDeleteCard={props.handleDeleteCard} deckId={props.deckId} />
    </>
  );
}
