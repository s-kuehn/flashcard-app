import React from "react";
import Card from "./Card";

export default function ViewCards(props) {

  const [currentCard, setCurrentCard] = React.useState(0);

  const cards = props.cards.map(card => {
    return <Card
      key={card.id}
      cardId={card.id}
      deckId={props.deckId}
      frontText={card.frontText}
      backText={card.backText}
      ableToDelete={false}
    />
  });

  function handleNextClick() {
    console.log('Next Card');
    if(currentCard < cards.length - 1) {
      setCurrentCard(prev => prev + 1);
    }
  }

  function handlePreviousClick() {
    console.log('Previous Card');
    if(currentCard > 0) {
      setCurrentCard(prev => prev - 1);
    }
  }

  console.log(currentCard, currentCard.length)
  
  return (
    <div className="view-cards">
      {cards[currentCard]}
      <div className="view-cards--options">
        {currentCard > 0 && <p onClick={handlePreviousClick}>Previous</p>}
        {currentCard < props.cards.length - 1 && <p onClick={handleNextClick}>Next</p>}
      </div>
    </div>
  );
}
