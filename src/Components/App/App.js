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
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import * as auth from '../../utils/auth';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../Context/CurrentUserContext';

function App() {
  const [isWindowMedium, setIsWindowMedium] = useState(770 >= window.innerWidth);
  const [isMobile, setIsMobile] = useState(520 >= window.innerWidth);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isBadRequest, setIsBadRequest] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let path = location.pathname;
    auth.checkToken()
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          navigate(path, { replace: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
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
        });

      moviesApi.getMovies()
        .then((movies) => {
          movies.forEach(movie => {
            let {
              country,
              director,
              duration,
              year,
              description,
              trailerLink,
              nameRU,
              nameEN,
              id: movieId,
            } = movie;
            let {
              url: image,
            } = movie.image;
            let {
              url: thumbnail,
            } = movie.image.formats.thumbnail;
            let newMovie = {
              country,
              director,
              duration,
              year,
              description,
              image,
              trailerLink,
              nameRU,
              nameEN,
              thumbnail,
              movieId,
            };
            if (savedMovies.find(savedMovie => savedMovie.movieId == newMovie.movieId)) {
              newMovie.isLiked = true;
            }
            setAllMovies((allMovies) => {
              allMovies.push(newMovie);
              return allMovies;
            })
          });
        })
        .catch(() => {
          setIsBadRequest(true);
        })
    }
  }, [loggedIn]);

  useEffect(() => {
    let copy = Object.assign([], allMovies);
    copy.map((m) => {
      if (savedMovies.find(savedMovie => savedMovie.movieId == m.movieId)) {
        m.isLiked = true;
      }
    });
    setAllMovies(copy);
  }, [savedMovies])

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

  function handleLikeClick(movie) {
    movie.isLiked
      ? deleteMovie(movie.movieId)
      : SaveMovie(movie)
  }

  function SaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then(() => {
        let copy = Object.assign([], allMovies);
        copy.map((m) => {
          if (m.movieId === movie.movieId)
            m.isLiked = true;
        });
        setAllMovies(copy);

        copy = Object.assign([], savedMovies);
        copy.unshift(movie);
        setSavedMovies(copy);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function deleteMovie(movieId) {
    mainApi.deleteMovie(movieId)
      .then(() => {
        setSavedMovies((savedMovies) => savedMovies.filter((m) => m.movieId !== movieId));
        let copy = Object.assign([], allMovies);
        copy.map((m) => {
          if (m.movieId === movieId)
            delete m.isLiked;
        });
        setAllMovies(copy);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleChangeUser(formValue) {
    mainApi.changeUser(formValue)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSignout() {
    auth.Signout()
      .then(() => {
        setLoggedIn(false);
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
              allMovies={allMovies}
              savedMovies={savedMovies}
              isBadRequest={isBadRequest}
              onLikeClick={handleLikeClick} />}
            />
            <Route path='/saved-movies' element={<ProtectedRoute element={SavedMovies}
              isLoggedIn={loggedIn}
              isWindowMedium={isWindowMedium}
              isMobile={isMobile}
              savedMovies={savedMovies}
              onDelete={deleteMovie} />
            } />
            <Route path='/profile' element={<ProtectedRoute element={Profile}
              isLoggedIn={loggedIn}
              onUserChange={handleChangeUser}
              onSignout={handleSignout} />} />

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
