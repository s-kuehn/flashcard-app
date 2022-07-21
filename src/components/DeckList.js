import React from "react";
import Deck from "./Deck";

export default function DeckList(props) {

  const deckList = props.decks.map(deck => {
    return <Deck
      key={deck.id}
      id={deck.id}
      deckTitle={deck.title}
      handleDeleteDeck={props.handleDeleteDeck}
      handleEditDeckTitle={props.handleEditDeckTitle}
      handleShowDeckOptions={props.handleShowDeckOptions}
    />
  })

  return (
    <div className="deck-container">
      {deckList}
    </div>
  );
}
