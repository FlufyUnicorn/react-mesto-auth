import {useFormValidation} from "../hooks/useFormValidation";
import {Link} from 'react-router-dom';
import InfoToolTip from "./InfoToolTip";
import React from 'react';

function Register(props) {
  const {values, handleChange, errors, isValid, setValues, resetForm} = useFormValidation({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid) {
      props.onRegister(values.password, values.email)
    }
  }
  React.useEffect(() => {
    if (props.loggedIn) resetForm()
  }, [props.loggedIn])

  return (
    <div>
      <div className='auth'>
        <div className='auth__wrapper'>
          <h1 className='auth__title'>Регистрация</h1>
          <form className='popup__form'>
            <label className="popup__label">
              <input type="email"
                     className='auth__input'
                     placeholder='Email'
                     value={values.email || ''}
                     name='email'
                     required={true}
                     onChange={handleChange}/>
              <span className={`email-input-error popup__input-error-text ${isValid ? '' : 'popup__input-error-text_active'}`}>{errors.email}</span>
            </label>
            <label className="popup__label">
              <input type="password"
                     className='auth__input'
                     placeholder='Пароль'
                     value={values.password || ''}
                     name='password'
                     required={true}
                     onChange={handleChange} />
              <span className={`password-input-error popup__input-error-text ${isValid ? '' : 'popup__input-error-text_active'}`}>{errors.password}</span>
            </label>
          </form>
        </div>
        <div className='register__down-wrapper'>
          <button className={`auth__button ${isValid ? '' : 'auth__button_disabled'}`}
                  disabled={!isValid}
                  type='submit'
                  onClick={handleSubmit}>Зарегистрироваться</button>
          <p className='auth__text'>Уже зарегистрированы? <Link to='/sign-in' className='auth__text'>Войти</Link></p>
        </div>
      </div>
      <InfoToolTip isOk={props.isOk} isOpen={props.isOpen} onClose={props.onClose} error={props.error} />
    </div>
  )
}

export default Register;