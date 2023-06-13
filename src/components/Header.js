import logo from "../images/logo_light.svg";

import React from "react";
import {Link, Route, Routes, useLocation} from "react-router-dom";

function Header(props) {
  const [isPopupOpened, setIsPopupOpened] = React.useState(false)
  const location = useLocation()

  const togglePopup = () => {
    setIsPopupOpened(!isPopupOpened)
  }
  return (
    <>
      {
        isPopupOpened && (
          <div className='header__popup'>
            {props.email && <p className='header__popup-text'>{props.email}</p>}
            <Link to='/sign-in'
                  className='header__link'
                  onClick={() => {
                    props.logout()
                    togglePopup()
                  }}>
            </Link>
          </div>
        )
      }
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Место"/>
        <div className='header__wrapper'>
          {props.email && <p className='header__text'>{props.email}</p>}
          <Routes>
            <Route path='/'
                   element={<Link to='/sign-in'
                                  className={`header__link ${location.pathname === '/' ? 'header__link_invisible' : ''}`}
                                  onClick={props.logout}>
              Выйти
            </Link>}/>
            <Route path='/sign-in'
                   element={<Link to='/sign-up'
                                  className={`header__link ${location.pathname === '/' ? 'header__link_invisible' : ''}`}>
              Регистрация
            </Link>}/>
            <Route path='/sign-up'
                   element={<Link to='/sign-in'
                                  className={`header__link ${location.pathname === '/' ? 'header__link_invisible' : ''}`}>
              Войти
            </Link>}/>
          </Routes>
        </div>
      </header>
    </>
  )
}

export default Header;