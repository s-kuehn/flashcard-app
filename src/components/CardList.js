import React from "react";
import Card from "./Card"

export default function CardList(props) {

  const cards = props.cards.map(card => {
    return <Card
      key={card.id}
      cardId={card.id}
      deckId={props.deckId}
      frontText={card.frontText}
      backText={card.backText}
      handleDeleteCard={props.handleDeleteCard}
      ableToDelete={true}
    />
  });

  return (
    <div className="card-container">
      {cards}
    </div>
  );
}
