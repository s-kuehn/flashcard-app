import React from "react";
import { MdAddCircleOutline } from "react-icons/md"

export default function AddDeck(props) {
  
  const [deckTitle, setDeckTitle] = React.useState('');

  function handleChange(event) {
    setDeckTitle(event.target.value);
  }

  function handleClick() {
    if(deckTitle.trim().length > 0) {
      props.handleAddDeck(deckTitle);
      setDeckTitle('');
    }
  }

  function handleEnterPress(event) {
    if(event.code === 'Enter' && deckTitle.length > 0) {
      props.handleAddDeck(deckTitle);
      setDeckTitle('');
    }
  }

  return (
    <>
      <div className="add-deck">
      <input onKeyDown={handleEnterPress} onChange={handleChange} className="deck-title-input" value={deckTitle} type="text" placeholder="Deck title here" />
      <button onClick={handleClick} className="add-deck-button" ><MdAddCircleOutline className="plus-icon" /></button>
    </div>
    </>
  );
}
