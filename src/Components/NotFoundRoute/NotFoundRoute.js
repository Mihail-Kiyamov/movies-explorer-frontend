import { NavLink } from 'react-router-dom';
import './NotFoundRoute.css';

function NotFoundRoute({ backPath }) {
    return (
        <section className='not-found-route'>
            <h1 className='not-found-route__title'>404</h1>
            <p className='not-found-route__text'>Страница не найдена</p>
            <NavLink to={backPath} className='not-found-route__back-link'>
                Назад
            </NavLink>
        </section>
    )
}

export default NotFoundRoute;