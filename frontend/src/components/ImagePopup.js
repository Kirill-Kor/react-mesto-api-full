
export default function ImagePopup({ card, onClose }) {
    if(card)
        return (
            <div className={`popup popup_type_image popup_opened`}>
                <div className="popup__image-container">
                    <img className="popup__image"
                        src={card.link} alt={card.name}/>
                    <p className="popup__caption">{card.name}</p>
                    <button className="popup__close-button popup__close-button_place_image" type="button"
                        aria-label="Закрыть" onClick={onClose}></button>
                </div>
            </div>
        )
}