import PopupWithForm from "./PopupWithForm";
import {useFormValidation} from "../hooks/useFormValidation";
import React from "react";

function AddPlacePopup(props) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormValidation({
    new_place: '',
    place_link: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isValid) {
      props.onAddPlace({
        new_place: values.new_place,
        place_link: values.place_link
      })
    }
  }
  React.useEffect(() => {
    if (!props.isOpen) {
      resetForm()
    }
  }, [props.isOpen])

  return (
    <PopupWithForm
      id={'place'}
      title={'Новое место'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="popup__label">
        <input id="place-input"
               type="text"
               className="popup__input"
               placeholder="Название"
               name="new_place"
               required
               minLength="2"
               maxLength="30"
               onChange={handleChange}
               value={values.new_place || ''}
        />
        <span className={`place-input-error popup__input-error-text ${isValid ? '' : 'popup__input-error-text_active'}`}>{errors.new_place}</span>
      </label>
      <label className="popup__label">
        <input id="url-input"
               type="url"
               className="popup__input"
               placeholder="Ссылка на картинку"
               name="place_link"
               required
               onChange={handleChange}
               value={values.place_link || ''}
        />
        <span className={`url-input-error popup__input-error-text ${isValid ? '' : 'popup__input-error-text_active'}`}>{errors.place_link}</span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;