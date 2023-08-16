import './Register.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register() {
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/');
    };

    const navigateSignin = () => {
        navigate('/signin');
    };

    return (
        <section className='register'>
            <img className="register__logo" src={logo} alt="Лого Movie Explorer" onClick={navigateHome} />
            <h1 className='register__title'>Добро пожаловать!</h1>
            <form className='register__submit-form' >
                <label className="register__form-field register__form-field_type_name">
                    <input className="register__input register__input_type_name" type="text" name="name"
                        placeholder="Имя" minLength="2" maxLength="30" required />
                </label>
                <label className="register__form-field register__form-field_type_email">
                    <input className="register__input register__input_type_email" type='email' name="email"
                        placeholder="E-mail" required />
                </label>
                <label className="register__form-field register__form-field_type_password">
                    <input className="register__input register__input_type_password" type='password' name="password"
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