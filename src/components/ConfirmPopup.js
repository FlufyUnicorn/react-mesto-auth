import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup(props) {
  function handleSubmit(e) {
    e.preventDefault()
    props.onSubmit(props.card)
  }

  return (
    <PopupWithForm
      id={props.id}
      title={props.title}
      buttonText={props.buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
    </PopupWithForm>
  )
}

export default ConfirmPopup;