import React from "react";
import CardList from "./CardList";

export default function DeckOptions(props) {

  function handleClickAddCards() {
    props.handleAddCards()
  }

  function handleClickStudy() {
    props.handleStudy()
  }

  function handleShuffleClick() {
    props.handleShuffle(props.deckId)
  }

  return (
    <div className="deck-options">
      <div className="deck-options--container">
        <div className="deck-options--top-options">
          <div onClick={handleClickAddCards} className="add-cards">
            <h4>Add Cards</h4>
          </div>
          <div onClick={handleClickStudy} className="study">
            <h4>Study</h4>
          </div>
        </div>
        <div onClick={handleShuffleClick} className="shuffle">
          <h4>Shuffle</h4>
        </div>
      </div>
      <CardList
        cards={props.cards}
        deckId={props.deckId}
        handleDeleteCard={props.handleDeleteCard}
      />
    </div>
  );
}
