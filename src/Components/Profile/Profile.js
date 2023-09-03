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
    const [errorsText, setErrorsText] = useState({
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
        let formsIsValid = true;

        //Сравнение с юзером
        if (user.name === formValue.name && user.email === formValue.email) {
            formsIsValid = false;
        }

        //name
        if (formValue.name.length < 2 || formValue.name.length > 30) {
            formsIsValid = false;
            errorsText.name = 'Имя должно быть больше 1 и меньше 31 символов';
            setErrorsText({
                ...errorsText,
                name: 'Имя должно быть больше 1 и меньше 31 символов'
            })
        } else {
            errorsText.name = '';
            setErrorsText({
                ...errorsText,
                name: ''
            })
        }

        //email
        if (!formValue.email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            formsIsValid = false;
            setErrorsText({
                ...errorsText,
                email: 'Введите email'
            })
        } else {
            setErrorsText({
                ...errorsText,
                email: ''
            })
        }

        setIsActiveButton(formsIsValid);
    }, [formValue])

    function handleChangeUser(e) {
        e.preventDefault();

        onUserChange(formValue)
            .then((result) => {
                console.log(result)
                if (result) {
                    handleCloseEdit();
                    handleOpenPopup();
                }
            });
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
                        <span className="profile__input-error">{errorsText.name}</span>
                    </label>
                    <label className="profile__form-field profile__form-field_type_email">
                        <input className="profile__input profile__input_type_email" value={formValue.email} onChange={handleChange} type='email' name="email"
                            placeholder="E-mail" required />
                        <span className="profile__input-error">{errorsText.email}</span>
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