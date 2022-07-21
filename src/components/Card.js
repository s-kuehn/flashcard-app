import React from "react";
import { MdDeleteForever } from "react-icons/md";

export default function Card(props) {

  const [flip, setFlip] = React.useState(false);

  function handleClick() {
    setFlip(prevValue => !prevValue)
  }

  function handleDeleteClick(e) {
    e.stopPropagation()
    console.log(props.cardId, props.deckId)
    props.handleDeleteCard(props.cardId, props.deckId)
  }

  return (
    <div className={`flashcard ${!flip ? 'front' : 'back'}`} onClick={handleClick}>
      {props.ableToDelete && <MdDeleteForever onClick={handleDeleteClick} className="flashcard--delete-icon" />}
      <div className="flashcard--content">
        {!flip ? <p className="flashcard--text">{props.frontText}</p>
        : <p className="flashcard--text ">{props.backText}</p>}
      </div>
    </div>
  );
}
