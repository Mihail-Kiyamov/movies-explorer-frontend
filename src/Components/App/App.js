import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundRoute from '../NotFoundRoute/NotFoundRoute';
import ProtectedRoute from '../../utils/ProtectedRoute';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import * as auth from '../../utils/auth';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../Context/CurrentUserContext';

function App() {
  const [isWindowMedium, setIsWindowMedium] = useState(770 >= window.innerWidth);
  const [isMobile, setIsMobile] = useState(520 >= window.innerWidth);
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: 'Михаил',
    email: 'mihailkiyamov@yandex.ru'
  });
  const [savedMovies, setSavedMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResizeWindow = () => {
      setIsWindowMedium(() => 770 >= window.innerWidth);
      setIsMobile(() => 520 >= window.innerWidth);
    };

    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [])

  useEffect(() => {
    if (loggedIn) {
      mainApi.getUser()
        .then((data) => {
          setCurrentUser(currentUser => ({
            ...currentUser,
            ...data
          }));
        })
        .catch((err) => {
          console.log(err);
        });

      mainApi.getSavedMovies()
        .then((data) => {
          setSavedMovies(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);

  function handleRegister(name, email, password) {
    auth.register(name, email, password)
      .then((res) => {
        if (res.data) {
          navigate('/signin', { replace: true });
        }
      })
      .catch(err => {
        console.log(err)
      });
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          navigate('/movies', { replace: true });
          return true;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header
            isLoggedIn={loggedIn}
            isWindowMedium={isWindowMedium}
          />
          <Routes>
            <Route path='/signup' element={<Register onRegister={handleRegister} />} />
            <Route path='/signin' element={<Login onLogin={handleLogin} />} />
            <Route path='/' element={<Main />} />

            <Route path='/movies' element={<ProtectedRoute element={Movies}
              isLoggedIn={loggedIn}
              isWindowMedium={isWindowMedium}
              isMobile={isMobile}
              savedMovies={savedMovies} />}
            />
            <Route path='/saved-movies' element={<ProtectedRoute element={SavedMovies}
              isLoggedIn={loggedIn}
              savedMovies={savedMovies} />
            } />
            <Route path='/profile' element={<ProtectedRoute element={Profile} isLoggedIn={loggedIn} />} />

            <Route path='/404' element={<NotFoundRoute />} />
          </Routes>
          <Footer
            isMobile={isMobile}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
