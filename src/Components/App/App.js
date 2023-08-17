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
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [isWindowMedium, setIsWindowMedium] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div className="page">
      <div className="page_container">
        <Header
          isWindowMedium={isWindowMedium}
        />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/404' element={<NotFoundRoute />} />
        </Routes>
        <Footer
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}

export default App;
