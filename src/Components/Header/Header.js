import { Route, Routes, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../../images/logo.svg';
import menuCloseIcon from '../../images/MenuCloseIcon.svg';
import menuIcon from '../../images/MenuIcon.svg';
import './Header.css';

function Header({ isWindowMedium, isLoggedIn }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    function navigateHome() {
        navigate('/');
    };

    function handleMobileMenuToggle() {
        setIsSideMenuOpen(state => !state)
    }

    useEffect(() => {
        setIsSideMenuOpen(false);
    }, [location.pathname]);

    return (
        <Routes>
            <Route path='/' element={
                <header className="header header_theme_blue">
                    <img className="header__logo" src={logo} alt="Лого Movie Explorer" onClick={navigateHome} />
                    {!isLoggedIn &&
                        <>
                            <NavLink to='/signup' className='header__signup-link'>
                                Регистрация
                            </NavLink>
                            <Link to='/signin' className='header__signin-link'>
                                <div type="button" className='header__signin-button'>
                                    <p className='header__signin-text'>Войти</p>
                                </div>
                            </Link>
                        </>
                    }
                    {isLoggedIn &&
                        <>
                            {!isWindowMedium &&
                                <>
                                    <NavLink to='/movies' className='header__movies-link'>
                                        Фильмы
                                    </NavLink>
                                    <NavLink to='/saved-movies' className='header__saved-movies-link'>
                                        Сохранённые фильмы
                                    </NavLink>
                                    <Link to='/profile' className='header__profile-link'>
                                        <div className='header__profile-button'>
                                            Аккаунт
                                            <div className='header__profile-icon'></div>
                                        </div>
                                    </Link>
                                </>}
                            {isWindowMedium &&
                                <>
                                    <img className='header__menu-icon' src={menuIcon} alt='Меню' onClick={handleMobileMenuToggle} />
                                    {isSideMenuOpen &&
                                        <div className='header__menu-layout'>
                                            <div className='header__menu'>
                                                <NavLink to='/' className='header__home-link'>
                                                    Главная
                                                </NavLink>
                                                <NavLink to='/movies' className='header__movies-link'>
                                                    Фильмы
                                                </NavLink>
                                                <NavLink to='/saved-movies' className='header__saved-movies-link'>
                                                    Сохранённые фильмы
                                                </NavLink>
                                                <Link to='/profile' className='header__profile-link'>
                                                    <div className='header__profile-button'>
                                                        Аккаунт
                                                        <div className='header__profile-icon'></div>
                                                    </div>
                                                </Link>
                                                <img className='header__menu-close-icon' src={menuCloseIcon} alt='Закрыть меню' onClick={handleMobileMenuToggle} />
                                            </div>
                                        </div>
                                    }
                                </>
                            }
                        </>
                    }
                </header>
            } />
            {["/movies", "/saved-movies", '/profile'].map((path) =>
                <Route path={path} element={
                    <header className="header">
                        <img className="header__logo" src={logo} alt="Лого Movie Explorer" onClick={navigateHome} />
                        {!isWindowMedium &&
                            <>
                                <NavLink to='/movies' className='header__movies-link'>
                                    Фильмы
                                </NavLink>
                                <NavLink to='/saved-movies' className='header__saved-movies-link'>
                                    Сохранённые фильмы
                                </NavLink>
                                <Link to='/profile' className='header__profile-link'>
                                    <div className='header__profile-button'>
                                        Аккаунт
                                        <div className='header__profile-icon'></div>
                                    </div>
                                </Link>
                            </>}
                        {isWindowMedium &&
                            <>
                                <img className='header__menu-icon' src={menuIcon} alt='Меню' onClick={handleMobileMenuToggle} />
                                {isSideMenuOpen &&
                                    <div className='header__menu-layout'>
                                        <div className='header__menu'>
                                            <NavLink to='/' className='header__home-link'>
                                                Главная
                                            </NavLink>
                                            <NavLink to='/movies' className='header__movies-link'>
                                                Фильмы
                                            </NavLink>
                                            <NavLink to='/saved-movies' className='header__saved-movies-link'>
                                                Сохранённые фильмы
                                            </NavLink>
                                            <Link to='/profile' className='header__profile-link'>
                                                <div className='header__profile-button'>
                                                    Аккаунт
                                                    <div className='header__profile-icon'></div>
                                                </div>
                                            </Link>
                                            <img className='header__menu-close-icon' src={menuCloseIcon} alt='Закрыть меню' onClick={handleMobileMenuToggle} />
                                        </div>
                                    </div>
                                }
                            </>
                        }
                    </header>
                } />
            )}

        </Routes>
    )
}

export default Header;