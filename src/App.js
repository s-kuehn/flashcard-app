import React from "react";
import { nanoid } from "nanoid";
import Navbar from "./components/Navbar";
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import DeckOptions from "./components/DeckOptions";
import ViewCards from "./components/ViewCards";
import "./style.css";

export default function App() {

  const [onHomePage, setOnHomePage] = React.useState(true);
  const [onDeckOptionsPage, setOnDeckOptionsPage] = React.useState(false);
  const [onStudyPage, setOnStudyPage] = React.useState(false);
  const [onAddCardsPage, setOnAddCardsPage] = React.useState(false);

  const [decks, setDecks] = React.useState(JSON.parse(localStorage.decks) || []);
  console.log(decks)
  const [viewDeckOptions, setViewDeckOptions] = React.useState({
    id: '',
    deckName: '',
  });

  React.useEffect(() => {
    localStorage.setItem("decks", JSON.stringify(decks));
  }, [decks]);

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
      while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  function addDeck(deckTitle) {
    const newDeck = {
      id: nanoid(),
      title: deckTitle,
      cards: []
    }
    setDecks(prevDecks => {
      return [
        newDeck,
        ...prevDecks
      ]
    });
  }

  function getDeck(id) {
    console.log('FINDING DECK!!!', id);
    return decks.filter(deck => deck.id === id)[0];
  }

  function deleteDeck(id) {
    console.log('DELETING DECK!!!', id);
    const newDecks = decks.filter(deck => deck.id !== id);
    setDecks(newDecks);
  }

  function editDeckTitle(newTitle, deckId) {
    console.log(newTitle, deckId);
    const newDecks = decks.map(deck => {
      if (deck.id === deckId) {
        return ({
          ...deck,
          title: newTitle
        })
      } else {
        return deck
      }
    })
    setDecks(newDecks)
  }

  function shuffleCards(deckId) {
    const newDecks = decks.map(deck => {
      if (deck.id === deckId) {
        return ({
          ...deck,
          cards: shuffle(deck.cards)
        })
      } else {
        return deck
      }
    })
    setDecks(newDecks)
  }

  function deleteCard(cardId, deckId) {
    console.log('DELETING CARD!!!', cardId);
    const newDecks = decks.map(deck => {
      if (deck.id === deckId) {
        return ({
          ...deck,
          cards: deck.cards.filter(card => card.id !== cardId)
        })
      } else {
        return deck
      }
    })
    setDecks(newDecks)
  }

  function showDeckOptionsPage(id) {
    console.log('Show Deck Options', id);
    setViewDeckOptions({
      id: id,
      deckName: decks.filter(deck => deck.id === id)[0].title,
    });
    setOnHomePage(false);
    setOnDeckOptionsPage(true);
  }

  function goHomePage() {
    setViewDeckOptions({
      id: '',
      deckName: '',
    });
    setOnHomePage(true);
    setOnDeckOptionsPage(false);
    setOnAddCardsPage(false);
    setOnStudyPage(false);
  }

  function addCardsPage() {
    setOnAddCardsPage(true);
    setOnDeckOptionsPage(false);
  }

  function studyPage() {
    setOnDeckOptionsPage(false);
    setOnStudyPage(true);
  }

  function deckOptionsPage() {
    setOnDeckOptionsPage(true);
    setOnStudyPage(false);
    setOnAddCardsPage(false);
  }

  function addCard(deckId, frontCardText, backCardText) {
    const newDecks = decks.map(deck => {
      if (deck.id === deckId) {
        const newCards = [...deck.cards]
        newCards.unshift({
          id: nanoid(),
          frontText: frontCardText,
          backText: backCardText
        })
        return ({
          ...deck,
          cards: newCards
        })
      } else {
        return deck
      }
    })
    setDecks(newDecks)
  }

  return (
    <>
      <Navbar
        handleOnHomePage={onHomePage}
        handleGoToDeck={deckOptionsPage}
        handleGoHome={goHomePage}
        deckName={viewDeckOptions.deckName}
      />
      {onHomePage && <AddDeck handleAddDeck={addDeck} />}
      {onDeckOptionsPage &&
      <DeckOptions
        deckId={viewDeckOptions.id}
        deckName={viewDeckOptions.deckName}
        cards={getDeck(viewDeckOptions.id).cards}
        handleDeleteCard={deleteCard}
        handleAddCards={addCardsPage}
        handleStudy={studyPage}
        handleShuffle={shuffleCards}
      />}
      {onStudyPage &&
      <ViewCards
        cards={getDeck(viewDeckOptions.id).cards}
      />}
      {onAddCardsPage &&
      <AddCard
        handleAddCard={(frontText, backText) => addCard(viewDeckOptions.id, frontText, backText)}
        handleDeleteCard={deleteCard}
        deckId={viewDeckOptions.id}
        cards={getDeck(viewDeckOptions.id).cards}
      />}
      {onHomePage &&
      <DeckList
        decks={decks}
        handleDeleteDeck={deleteDeck}
        handleEditDeckTitle={editDeckTitle}
        handleShowDeckOptions={showDeckOptionsPage}
      />}
    </>
  );
}
