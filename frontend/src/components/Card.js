import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = currentUser._id === card.owner._id;
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    const cardLikeButtonClassName = `card__like-button ${isLiked && "card__like-button_active"}`

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <li className="card" >
            <img className="card__image"
                src={card.link}
                alt={card.name} 
                onClick={handleClick}
                />
            <div className="card__content">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-container">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Нравится"></button>
                    <p className="card__like-counter">{card.likes.length}</p>
                </div>
                {isOwn &&
                    <button className="card__delete-button" type="button" onClick={handleDeleteClick} aria-label="Удалить"></button>
                }
            </div>
        </li>
    )
}