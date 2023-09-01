import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../../images/logo.svg';

function Register({ onRegister }) {
    const navigate = useNavigate();
    const [isDisable, setIsDisable] = useState(false);

    const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [errorsText, setErrorsText] = useState({
        name: '',
        email: '',
        password: ''
    })
    
    const navigateHome = () => {
        navigate('/');
    };

    const navigateSignin = () => {
        navigate('/signin');
    };

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

    useEffect(() => {
        let formsIsValid = true;
        //name
        if (formValue.name.length < 2 || formValue.name.length > 30) {
            formsIsValid = false;
            errorsText.name = 'Имя должно быть больше 1 и меньше 31 символов';
        } else {
            errorsText.name = '';
        }

        //email
        if (!formValue.email) {
            formsIsValid = false;
            errorsText.email = 'Не может быть пустым';
        } else if (!formValue.email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            formsIsValid = false;
            errorsText.email = 'Введите email';
        } else {
            errorsText.email = '';
        }

        //password
        if (formValue.password.length < 8) {
            formsIsValid = false;
            errorsText.password = 'Пароль должен быть больше 8 символов';
        } else {
            errorsText.password = '';
        }

        setIsDisable(!formsIsValid);
    }, [formValue])

    return (
        <section className='register'>
            <img className="register__logo" src={logo} alt="Лого Movie Explorer" onClick={navigateHome} />
            <h1 className='register__title'>Добро пожаловать!</h1>
            <form className='register__submit-form' onSubmit={handleSubmit}>
                <label className="register__form-field register__form-field_type_name">
                    <input className="register__input register__input_type_name" onChange={handleChange} type="text" name="name"
                        placeholder="Имя" minLength="2" maxLength="30" required />
                    <span className="register__input-error">{errorsText.name}</span>
                </label>
                <label className="register__form-field register__form-field_type_email">
                    <input className="register__input register__input_type_email" onChange={handleChange} type='email' name="email"
                        placeholder="E-mail" required />
                    <span className="register__input-error">{errorsText.email}</span>
                </label>
                <label className="register__form-field register__form-field_type_password">
                    <input className="register__input register__input_type_password" onChange={handleChange} type='password' name="password"
                        placeholder="Пароль" required />
                    <span className="register__input-error">{errorsText.password}</span>
                </label>
                <input className='register__submit-button' type='submit' value='Зарегистрироваться' disabled={isDisable} />
                <p className='register__text'>Уже зарегистрированы? <a className='register__signin-link' onClick={navigateSignin}>Войти</a></p>
            </form>
        </section>
    )
}

export default Register;