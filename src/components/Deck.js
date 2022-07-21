import React from "react";
import { MdDeleteForever, MdModeEditOutline } from "react-icons/md";

export default function Deck(props) {

  const [editTitle, setEditTitle] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');

  function handleClick() {
    !editTitle && props.handleShowDeckOptions(props.id)
    if(editTitle && newTitle.length > 0) {
      props.handleEditDeckTitle(newTitle, props.id);
      setEditTitle(false)
    };
  }

  function handleEnterPress(event) {
    if(event.code === 'Enter' && newTitle.length > 0) {
      props.handleEditDeckTitle(newTitle, props.id);
      setEditTitle(false)
    }
  }

  function handleDeleteClick(e) {
    e.stopPropagation();
    props.handleDeleteDeck(props.id);
  }

  function handleEditClick(e) {
    e.stopPropagation();
    setEditTitle(true);
  }

  function handleChange(event) {
    setNewTitle(event.target.value);
  }

  return (
    <div onClick={handleClick} className="deck">
      <MdModeEditOutline onClick={handleEditClick} className="deck--edit-icon" />
      <MdDeleteForever onClick={handleDeleteClick} className="deck--delete-icon" />
      <div className="deck--content">
        {!editTitle ? <p className="deck--text">{props.deckTitle}</p>
        : <input onKeyDown={handleEnterPress} onChange={handleChange} className="edit-name-input" value={newTitle} autoFocus onClick={(e) => e.stopPropagation()} type="text"></input>}
      </div>
    </div>
  );
}
