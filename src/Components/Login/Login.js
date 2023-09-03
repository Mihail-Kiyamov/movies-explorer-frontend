import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../../images/logo.svg';

function Login({ onLogin }) {
    const navigate = useNavigate();
    const [isDisable, setIsDisable] = useState(false);

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const [errorsText, setErrorsText] = useState({
        email: '',
        password: ''
    })

    const navigateHome = () => {
        navigate('/');
    };

    const navigateSigniup = () => {
        navigate('/signup');
    };

    function handleChange(e) {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    useEffect(() => {
        let formsIsValid = true;
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

    function handleSubmit(e) {
        e.preventDefault();

        onLogin(formValue.email, formValue.password);
    }


    return (
        <section className='login'>
            <img className="login__logo" src={logo} alt="Лого Movie Explorer" onClick={navigateHome} />
            <h1 className='login__title'>Рады видеть!</h1>
            <form className='login__submit-form' onSubmit={handleSubmit}>
                <label className="login__form-field login__form-field_type_email">
                    <input className="login__input login__input_type_email" onChange={handleChange} type='email' name="email"
                        placeholder="E-mail" required />
                    <span className="login__input-error">{errorsText.email}</span>
                </label>
                <label className="login__form-field login__form-field_type_password">
                    <input className="login__input login__input_type_password" onChange={handleChange} type='password' name="password"
                        placeholder="Пароль" required />
                    <span className="login__input-error">{errorsText.password}</span>
                </label>
                <input className='login__submit-button login__submit-button_type_disable' type='submit' value='Войти' disabled={isDisable} />
                <p className='login__text'>Ещё не зарегистрированы? <a className='login__signup-link' onClick={navigateSigniup}>Регистрация</a></p>
            </form>
        </section>
    )
}

export default Login;