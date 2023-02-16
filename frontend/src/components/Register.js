import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import './Register.css';
import { register } from '../utils/Auth';
import InfoTooltip from "./InfoTooltip";

function Register() {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        register({ userEmail, userPassword })
            .then((response) => {
                if (response.error) {
                    Promise.reject();
                }
                else setSuccess(true);
            })
            .catch(error => {
                setError(error);
            })
    }

    function popupClose() {
        if (error) {
            setError('');
        }
        else {
            setSuccess(false);
            history.push('/sign-in')
        }

    }

    return (
        <div className="register-container">
            <h2 className="register-container__title">Регистрация</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <input className="register-form__input" type="email" placeholder='Email' onChange={e => setUserEmail(e.target.value)} value={userEmail} />
                <input className="register-form__input" type="password" placeholder='Пароль' onChange={e => setUserPassword(e.target.value)} value={userPassword} />
                <button className="register-form__button" type="submit">Зарегистрироваться</button>
            </form>
            <Link to="/sign-in" className="register-container__link">Уже зарегистрированы? Войти</Link>
            {success && <InfoTooltip message='Вы успешно зарегистрировались.' onClose={popupClose} />}
            {error && <InfoTooltip message={error} onClose={popupClose} isError />}
        </div>
    )
}

export default Register;