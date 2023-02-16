import './Login.css'
import {login} from '../utils/Auth'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

function Login(props) {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        login({ userEmail, userPassword })
            .then((response) => {
                localStorage.setItem('jwt', response.token);
                props.onLogin();
            })
            .catch(() => {
                setError(true);
            })

    }

    function closeError() {
        setError(false)
    }

    return (
        <div className="login-container">
            <h2 className="login-container__title">Вход</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input className="login-form__input" type="email" placeholder='Email' onChange={e => setUserEmail(e.target.value)} value={userEmail} />
                <input className="login-form__input" type="password" placeholder='Пароль' onChange={e => setUserPassword(e.target.value)} value={userPassword} />
                <button className="login-form__button" type="submit">Войти</button>
            </form>
            {error && <InfoTooltip message='Что-то пошло не так! Попробуйте ещё раз.' onClose={closeError} isError />}

        </div>
    )
}

export default Login;