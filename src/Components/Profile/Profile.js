import './Profile.css';
import { useState } from 'react';

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
            <a className='profile__edit-button' type='button'>Редактировать</a>
            <a className='profile__logout-button' type='button'>Выйти из аккаунта</a>
        </main>
    )
}

export default Profile;