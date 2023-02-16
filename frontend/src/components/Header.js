import { Link } from "react-router-dom";

function Header(props) {
    function handleLogoutClick() {
        if (props.isLoggedIn) {
            props.onLogout();
        }
    }
    return (
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__container">
                <p className="header__user">{props.email}</p>

                {/* Если вход выполнен, т.е. LoggedIn = true, отрисовываем кнопку выхода, иначе ссылку на вход/регистрацию */}
                {props.isLoggedIn
                    ? <a className="header__link" onClick={handleLogoutClick}>{props.text}</a>
                    : <Link className="header__link" to={props.onLoginPage ? '/sign-up' : '/sign-in'} >{props.text}</Link>}
            </div>
        </header>
    )
}

export default Header;