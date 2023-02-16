import { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import api from '../utils/Api';
import Card from './Card';
import Loading from './Loading'

function Main(props) {
    const user = useContext(CurrentUserContext);

    return (
        <main className="content">

            <section className="profile">
                <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                    {
                        props.isLoading
                            ? <Loading />
                            : <img className="profile__avatar" src={user.avatar} alt="Аватар пользователя" />
                    }
                    <div className="profile__avatar-overlay"></div>
                </div>

                <div className="profile__info">
                    <h1 className="profile__name">{user.name}</h1>
                    <p className="profile__description">{user.about}</p>
                    <button className="profile__edit-button" onClick={props.onEditProfile} type="button" aria-label="Изменить"></button>
                </div>
                <button className="profile__add-button" onClick={props.onAddPlace} type="button" aria-label="Добавить"></button>
            </section>

            <section className="places">
                <ul className="places__table">
                    {props.cards.map((card) => (
                            <Card
                                card={card}
                                key={card._id}
                                onCardClick={props.onCardClick}
                                onCardLike={props.onCardLike}
                                onCardDelete={props.onCardDelete}
                            ></Card>)
                    )}

                </ul>
            </section>
        </main>
    )
}

export default Main;