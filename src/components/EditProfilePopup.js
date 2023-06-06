import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useFormValidation} from "../hooks/useFormValidation";

function EditProfilePopup(props) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormValidation({
    name: '',
    about: '',
  })
  const currentUser = React.useContext(CurrentUserContext)

  function handleSubmit(e) {
    e.preventDefault()
    if (isValid) {
      props.onUpdateUser({
        name: values.name,
        about: values.about,
      })
    }
  }

  React.useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setValues({
        name: currentUser.name,
        about: currentUser.about
      })
    }
    if (!props.isOpen) {
      resetForm()
    }
  }, [props.isOpen])
  return (
    <PopupWithForm
      id={'profile'}
      title={'Редактировать профиль'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="popup__label">
        <input id="name-input"
               type="text"
               className="popup__input"
               name="name"
               placeholder="Ваше Имя"
               minLength="2"
               maxLength="40"
               required
               onChange={handleChange}
               value={values.name || ''}
        />
        <span className={`name-input-error popup__input-error-text ${isValid ? '' : 'popup__input-error-text_active'}`}>{errors.name}</span>
      </label>
      <label className="popup__label">
        <input id="job-input"
               type="text"
               className="popup__input"
               name="about"
               placeholder="Место работы"
               minLength="2"
               maxLength="200"
               required
               onChange={handleChange}
               value={values.about || ''}
        />
        <span className={`job-input-error popup__input-error-text ${isValid ? '' : 'popup__input-error-text_active'}`}>{errors.about}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;