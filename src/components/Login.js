import React from 'react';
import {useFormValidation} from "../hooks/useFormValidation";
import {useNavigate} from "react-router-dom";
import InfoToolTip from "./InfoToolTip";

function Login(props) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormValidation({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  React.useEffect(() => {
    if (props.loggedIn) {
      navigate('/')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) {
      props.onLogin(values.password, values.email)
    }
  }

  React.useEffect(() => {
    if (props.loggedIn) navigate('/')
    resetForm()
  }, [props.loggedIn])

  return (
    <div className='auth'>
      <div className='auth__wrapper'>
      <form className='auth__form' onSubmit={handleSubmit}>
        <p className="auth-form__welcome">Вход</p>
        <label className="popup__label">
          <input type="email"
                 name='email'
                 required
                 id="user-email-input"
                 className='auth__input form__input_user_email'
                 placeholder='Email'
                 value={values.email || ''}
                 onChange={handleChange}/>
          <span
            className={`email-input-error popup__input-error-text${isValid ? '' : 'popup__input-error-text_active'}`}>{errors.email}</span>
        </label>
        <label className="popup__label">
          <input type="password"
                 name='password'
                 required
                 className='auth__input form__input_user_password'
                 id="user-password-input"
                 placeholder='Пароль'
                 value={values.password || ''}
                 onChange={handleChange}/>
          <span
            className={`password-input-error popup__input-error-text${isValid ? '' : 'popup__input-error-text_active'}`}>{errors.password}</span>
        </label>

      </form>
      <button className={`auth__button ${isValid ? '' : 'auth__button_disabled'}`} disabled={!isValid}
              onClick={handleSubmit}>Войти
      </button>
      </div>
    </div>
  )
}

export default Login;