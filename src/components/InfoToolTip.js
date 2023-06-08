import React from 'react';
import ok from '../images/ok.svg';
import not_ok from '../images/not_ok.svg';
import {useLocation, useNavigate} from "react-router-dom";

function InfoToolTip(props) {
  const navigate = useNavigate()
  const location = useLocation()

  const closePopup = () => {
    if (props.isOk) {
      props.onClose()
      if (location.pathname === '/sign-up') {
        navigate('/sign-in')
      }
    } else {
      props.onClose()
    }
  }

  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={closePopup}/>
        {props.isOk && (<>
          <img src={ok} alt="Регистрация прошла успешно" className='popup__icon'/>
          <p className='popup__text'>Вы успешно зарегистрировались!</p>
        </>)}
        {!props.isOk && (<>
          <img src={not_ok} alt="Что-то пошло не так" className='popup__icon'/>
          <p className='popup__text'>{props.error.message ?? 'Что-то пошло не так!\n' +
          'Попробуйте ещё раз.'}</p>
        </>)}
      </div>
    </div>
  )
}
export default InfoToolTip;