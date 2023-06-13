import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {api} from "../utils/Api";
import {Route, Routes, useNavigate, Navigate} from 'react-router-dom';
import {register,login,checkToken} from "../utils/auth";
import ConfirmPopup from "./ConfirmPopup";
import InfoToolTip from "./InfoToolTip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isImageOpen, setIsImageOpen] = React.useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] =React.useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [removedCardId, setRemovedCardId] = React.useState('');

  const [loggedIn, setLoggedIn] = React.useState(false)
  const [isOk, setIsOk] = React.useState(false)
  const [error, setError] = React.useState('')
  const [userEmail, setUserEmail] = React.useState('')

  const navigate = useNavigate()

  React.useEffect(() => {
    api.getUserInfo()
      .then(res => setCurrentUser(res))
      .catch(console.log)
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then(res => setCards(res))
      .catch(console.log)
  }, [])

  function handleCardClick(card) {
    setIsImageOpen(true)
    setSelectedCard(card)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(console.log)
  }

  const handleCardDeleteClick = (cardId) => {
    setIsDeletePopupOpen(!isDeletePopupOpen)
    setRemovedCardId(cardId)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((arr) => arr.filter((item) => card._id !== item._id))
        closeAllPopups()
      })
      .catch(console.log)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImageOpen(false)
    setIsInfoTooltipOpen(false)
    setIsDeletePopupOpen(false)
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImageOpen ||
    isInfoTooltipOpen ||
    isDeletePopupOpen ||
    selectedCard

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape)
      return () => {
        document.removeEventListener("keydown", closeByEscape)
      }
    }
  }, [isOpen])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleUpdateUser(obj) {
    api.setUserInfo(obj)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(console.log)
  }

  function handleUpdateAvatar(obj) {
    api.changeAvatar(obj)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(console.log)
  }

  function handleAddPlace(obj) {
    api.addNewCard(obj)
      .then(res => {
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch(console.log)
  }

  function handleRegister(password,email) {
    register(password, email)
      .then((data) => {
        if (data) {
          setIsOk(true)
          setIsInfoTooltipOpen(true)
        }
      })
      .catch((e) => {
        console.warn(e)
        setIsOk(false)
        setIsInfoTooltipOpen(true)
        setError(error)
      })
  }

  const handleLogin = async (password, email) => {
    try {
      const {token} = await login(password, email)
      const {data} = await checkToken(token)
      setUserEmail(data.email)
      setLoggedIn(true)
      localStorage.setItem('token', token)
    } catch (e) {
      console.warn(e)
      setIsOk(false)
      setIsInfoTooltipOpen(true)
      console.log(isInfoTooltipOpen, 'infotool')
      setError(e)
    }
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('token')
    if (jwt) {
      checkToken(jwt)
        .then((data) => {
          if (data) {
            setLoggedIn(true)
            setUserEmail(data.data.email)
            navigate('/')
          }
        })
        .catch((e) => {
          console.warn(e)
          setLoggedIn(false)
        })
    }
  },[])

  function logout() {
    setUserEmail('')
    localStorage.removeItem('token')
    setLoggedIn(false)
  }

return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="root">
      <div className="page">
        <Header email={userEmail} logout={logout} />
        <Routes>
          <Route
            path='/'
            element={
             <ProtectedRoute
               Component={Main}
               cards={cards}
               onEditProfile={handleEditProfileClick}
               onAddPlace={handleAddPlaceClick}
               onEditAvatar={handleEditAvatarClick}
               onCardClick={handleCardClick}
               onCardLike={handleCardLike}
               onCardDelete={handleCardDeleteClick}
               onClose={closeAllPopups}
               loggedIn={loggedIn}
             />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                onRegister={handleRegister}
                loggedIn={loggedIn}
                isOk={isOk}
                isOpen={isInfoTooltipOpen}
                onClose={closeAllPopups}
                error={error}
              />}
          />
          <Route
            path="/sign-in"
            element={
              <Login
                onLogin={handleLogin}
                loggedIn={loggedIn}
                isOk={isOk}
                isOpen={isInfoTooltipOpen}
                onClose={closeAllPopups}
                error={error}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>
        <ImagePopup isOpen={isImageOpen} onClose={closeAllPopups} card={selectedCard}/>
        <ConfirmPopup id={'delete'} title={'Вы уверены?'} isOpen={isDeletePopupOpen} onClose={closeAllPopups} buttonText={"Да"} onSubmit={handleCardDelete} card={removedCardId}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <InfoToolTip isOk={isOk} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} error={error}/>
      </div>
    </div>
  </ CurrentUserContext.Provider>
)
}

export default App;
