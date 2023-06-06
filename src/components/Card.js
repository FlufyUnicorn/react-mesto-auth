import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
  const user = React.useContext(CurrentUserContext)
  const isOwn = props.card.owner._id === user._id
  const isLiked = props.card.likes.some(i => i._id === user._id)
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked && 'card__like-button_active'}`
  )
  return (
    <li className="card">
      {isOwn && <button className="card__delete-button" type="button" onClick={() => props.onCardDelete(props.card)}/>}
      <img className="card__image" src={props.image} alt={props.title} onClick={() => props.onCardClick(props.card)}/>
      <div className="card__info">
        <h2 className="card__name">{props.title}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={() => props.onCardLike(props.card)}/>
          <p className="card__like-counter">{props.likeCounter}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;