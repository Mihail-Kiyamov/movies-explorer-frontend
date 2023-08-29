import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../images/logo.svg';

function Login({ onLogin }) {
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/');
    };

    const navigateSigniup = () => {
        navigate('/signup');
    };

    const [formValue, setFormValue] = useState({
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
                </label>
                <label className="login__form-field login__form-field_type_password">
                    <input className="login__input login__input_type_password" onChange={handleChange} type='password' name="password"
                        placeholder="Пароль" required />
                </label>
                <input className='login__submit-button' type='submit' value='Войти' />
                <p className='login__text'>Ещё не зарегистрированы? <a className='login__signup-link' onClick={navigateSigniup}>Регистрация</a></p>
            </form>
        </section>
    )
}

export default Login;