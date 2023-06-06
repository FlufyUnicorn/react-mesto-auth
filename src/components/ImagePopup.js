function ImagePopup(props) {
  return (
    <div className={`popup popup_img ${props.isOpen ? 'popup_opened' : null}`} id="popup_image">
      <div className="popup__img-wrapper">
        <button className="popup__close-button popup__close-button_place_image" id="image_close" type="button"
                onClick={props.onClose}/>
        <img className="popup__img" src={props.card.link} alt={props.card.name}/>
        <h3 className="popup__img-description">{props.card.name}</h3>
      </div>
    </div>
  )
}

export default ImagePopup;