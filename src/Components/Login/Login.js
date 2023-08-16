import './Login.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login() {
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/');
    };

    const navigateSigniup = () => {
        navigate('/signup');
    };

    return (
        <section className='login'>
            <img className="login__logo" src={logo} alt="Лого Movie Explorer" onClick={navigateHome} />
            <h1 className='login__title'>Рады видеть!</h1>
            <form className='login__submit-form' >
                <label className="login__form-field login__form-field_type_email">
                    <input className="login__input login__input_type_email" type='email' name="email"
                        placeholder="E-mail" required />
                </label>
                <label className="login__form-field login__form-field_type_password">
                    <input className="login__input login__input_type_password" type='password' name="password"
                        placeholder="Пароль" required />
                </label>
                <input className='login__submit-button' type='submit' value='Войти' />  
                <p className='login__text'>Ещё не зарегистрированы? <a className='login__signup-link' onClick={navigateSigniup}>Регистрация</a></p>
            </form>
        </section>
    )
}

export default Login;