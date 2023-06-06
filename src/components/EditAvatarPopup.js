import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }
  return (
    <PopupWithForm
      id={'avatar'}
      title={'Обновить аватар'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input id="avatar-input" type="url" className="popup__input" ref={avatarRef} placeholder="Ссылка на аватар" name="avatar"
               required />
        <span className="avatar-input-error popup__input-error-text"/>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup