import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../images/logo.svg';

function Register({ onRegister }) {
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/');
    };

    const navigateSignin = () => {
        navigate('/signin');
    };

    const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        password: ''
    })

    function handleChange(e) {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        onRegister(formValue.name, formValue.email, formValue.password);
    }

    return (
        <section className='register'>
            <img className="register__logo" src={logo} alt="Лого Movie Explorer" onClick={navigateHome} />
            <h1 className='register__title'>Добро пожаловать!</h1>
            <form className='register__submit-form' onSubmit={handleSubmit}>
                <label className="register__form-field register__form-field_type_name">
                    <input className="register__input register__input_type_name" onChange={handleChange} type="text" name="name"
                        placeholder="Имя" minLength="2" maxLength="30" required />
                </label>
                <label className="register__form-field register__form-field_type_email">
                    <input className="register__input register__input_type_email" onChange={handleChange} type='email' name="email"
                        placeholder="E-mail" required />
                </label>
                <label className="register__form-field register__form-field_type_password">
                    <input className="register__input register__input_type_password" onChange={handleChange} type='password' name="password"
                        placeholder="Пароль" required />
                    <span className="register__input-error"></span>
                </label>
                <input className='register__submit-button' type='submit' value='Зарегистрироваться' />
                <p className='register__text'>Уже зарегистрированы? <a className='register__signin-link' onClick={navigateSignin}>Войти</a></p>
            </form>
        </section>
    )
}

export default Register;