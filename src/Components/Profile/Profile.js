import './Profile.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState({
        name: 'Михаил',
        email: 'mihailkiyamov@yandex.ru',
    })

    return (
        <main className='profile'>
            <h1 className='profile__title'>{'Привет, ' + user.name + '!'}</h1>
            <div className='profile__container'>
                <p className="profile__text" type="text">Имя</p>
                <p className='profile__user-text'>{user.name}</p>
                <div className='profile__line'></div>
                <p className="profile__text">E-mail</p>
                <p className='profile__user-text'>{user.email}</p>
            </div>
            <a className='profile__edit-button' >Редактировать</a>
            <NavLink className='profile__logout-button' to='/' >Выйти из аккаунта</NavLink>
        </main>
    )
}

export default Profile;