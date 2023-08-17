import './Footer.css'
import { Route, Routes } from 'react-router-dom';

function Footer({ isMobile }) {
    return (
        <Routes>
            {["/movies", "/saved-movies", '/'].map((path) =>
                <Route path={path} element={
                    <section className='footer'>
                        <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
                        <div className='footer__line'></div>
                        {!isMobile &&
                            <div className='footer__container'>
                                <p className='footer__year'>© 2020</p>
                                <a className='footer__practicum-link' href='https://practicum.yandex.ru/' target="_blank">Яндекс.Практикум</a>
                                <a className='footer__github-link' href='https://github.com/Mihail-Kiyamov?tab=repositories' target="_blank">Github</a>
                            </div>
                        }
                        {isMobile &&
                            <div className='footer__container'>
                                <a className='footer__practicum-link' href='https://practicum.yandex.ru/' target="_blank">Яндекс.Практикум</a>
                                <a className='footer__github-link' href='https://github.com/Mihail-Kiyamov?tab=repositories' target="_blank">Github</a>
                                <p className='footer__year'>© 2020</p>
                            </div>
                        }
                    </section>
                } />
            )}
        </Routes>
    )
}

export default Footer;