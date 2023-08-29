import './Profile.css';
import { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../Context/CurrentUserContext';
import mainApi from '../../utils/MainApi';

function Profile() {
    const user = useContext(CurrentUserContext);

    const [isEdit, setIsEdit] = useState(false);
    const [formValue, setFormValue] = useState({
        name: '',
        email: ''
    })

    useEffect(() => {
        setFormValue({
            name: user.name ? user.name : '',
            email: user.email ? user.email : ''
        });
    }, [user]);

    function handleOpenEdit() {
        setIsEdit(true);
    }

    function handleCloseEdit() {
        setIsEdit(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleChangeUser(e) {
        e.preventDefault();

        mainApi.changeUser(formValue)
            .then((data) => {
                setFormValue({
                    name: data.name,
                    email: data.email,
                });
                setIsEdit(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <main className='profile'>
            {!isEdit &&
                <>
                    <h1 className='profile__title'>{'Привет, ' + user.name + '!'}</h1>
                    <div className='profile__container'>
                        <p className="profile__text" >Имя</p>
                        <p className='profile__user-text'>{user.name}</p>
                        <div className='profile__line'></div>
                        <p className="profile__text">E-mail</p>
                        <p className='profile__user-text'>{user.email}</p>
                    </div>
                    <a className='profile__edit-button' onClick={handleOpenEdit} >Редактировать</a>
                    <NavLink className='profile__logout-button' to='/' >Выйти из аккаунта</NavLink>
                </>
            }
            {isEdit &&
                <form className='profile__submit-form' onSubmit={handleChangeUser}>
                    <label className="profile__form-field profile__form-field_type_name">
                        <input className="profile__input profile__input_type_name" value={formValue.name} onChange={handleChange} type='text' name="name"
                            placeholder="Имя" required />
                    </label>
                    <label className="profile__form-field profile__form-field_type_email">
                        <input className="profile__input profile__input_type_email" value={formValue.email} onChange={handleChange} type='email' name="email"
                            placeholder="E-mail" required />
                    </label>
                    <input className='profile__submit-button' type='submit' value='Сохранить' />
                    <a className='profile__edit-cancel' onClick={handleCloseEdit} >Отменить</a>
                </form>
            }
        </main>
    )
}

export default Profile;