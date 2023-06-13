import React from 'react';
import {useFormValidation} from "../hooks/useFormValidation";
import {useNavigate} from "react-router-dom";

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
        <h1 className='auth__title'>Вход</h1>
        <form className='popup__form' onSubmit={handleSubmit}>
          <label className="popup__label">
            <input type='email'
                   name='email'
                   required={true}
                   className='auth__input'
                   placeholder='Email'
                   value={values.email || ''}
                   onChange={handleChange}/>
            <span
              className={`email-input-error popup__input-error-text ${isValid ? '' : 'popup__input-error-text_active'}`}>{errors.email}</span>
          </label>
          <label className='popup__label'>
            <input type='password'
                   name='password'
                   required={true}
                   className='auth__input'
                   placeholder='Пароль'
                   value={values.password || ''}
                   onChange={handleChange}/>
            <span
              className={`password-input-error popup__input-error-text ${isValid ? '' : 'popup__input-error-text_active'}`}>{errors.password}</span>
          </label>
          <button className={`auth__button ${isValid ? '' : 'auth__button_disabled'}`} disabled={!isValid}>Войти
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;