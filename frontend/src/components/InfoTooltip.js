import './InfoTooltip.css'

export default function InfoTooltip({message, onClose, isError}) {
    return (
        <div className="popup popup_opened tooltip">
            <div className="popup__container">
                <img className="tooltip__image" src={isError ? '/error.svg' : '/success.svg'} alt={isError ? "Ошибка" : "Успешно"}></img>
                <h2 className="popup__title tooltip__title">{message}</h2>
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
            </div>
        </div>
    )
}