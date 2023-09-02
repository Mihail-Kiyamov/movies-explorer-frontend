import './Profile.css';
import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../Context/CurrentUserContext';

function Profile({ onUserChange, onSignout }) {
    const user = useContext(CurrentUserContext);

    const [isEdit, setIsEdit] = useState(false);
    const [isActiveButton, setIsActiveButton] = useState(false);
    const [formValue, setFormValue] = useState({
        name: '',
        email: ''
    })
    const [isPopupOpen, setIsPopupOpen] = useState(false);

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

    useEffect(() => {
        if (user.name === formValue.name && user.email === formValue.email) {
            setIsActiveButton(false);
        } else {
            setIsActiveButton(true);
        };
    }, [formValue])

    function handleChangeUser(e) {
        e.preventDefault();

        if (onUserChange(formValue)) {
            handleCloseEdit();
            handleOpenPopup();
        };

    }

    function signout() {
        onSignout()
    }

    function handleOpenPopup() {
        setIsPopupOpen(true);
    }

    function handleClosePopup() {
        setIsPopupOpen(false);
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
                    <a className='profile__logout-button' onClick={signout} >Выйти из аккаунта</a>
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
                    <input className='profile__submit-button' type='submit' value='Сохранить' disabled={!isActiveButton} />
                    <a className='profile__edit-cancel' onClick={handleCloseEdit} >Отменить</a>
                </form>
            }
            {isPopupOpen &&
                <div className='profile__popup-success'>
                    <p className='profile__popup-text'>Профиль успешно сохранён</p>
                    <p className='profile__popup-close' onClick={handleClosePopup}>Ok</p>
                </div>
            }
        </main>
    )
}

export default Profile;