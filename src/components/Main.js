import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
  const ProfileContext = React.useContext(CurrentUserContext)
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-img" src={ProfileContext.avatar} alt={ProfileContext.name} onClick={props.onEditAvatar}/>
        </div>
        <h1 className="profile__name">{ProfileContext.name}</h1>
        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}/>
        <p className="profile__job">{ProfileContext.about}</p>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}/>
      </section>
      <section className="elements">
        <ul className="cards">
          {
            props.cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                title={card.name}
                likeCounter={card.likes.length}
                image={card.link}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;