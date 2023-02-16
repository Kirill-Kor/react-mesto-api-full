import { useState } from "react"
import PopupWithForm from "./PopupWithForm"

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [newCardName, setNewCardName] = useState('');
    const [newCardLink, setNewCardLink] = useState('');

    function handleSubmit() {
        onAddPlace({name: newCardName, link: newCardLink});
    }

    return (
        <PopupWithForm
          name="add-post"
          title="Новое место"
          buttonText="Создать"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}>
          <input id="place-name-input" name="name" className="edit-form__field edit-form__field_type_place-name"
            type="text" value={newCardName} placeholder="Название" minLength="2" maxLength="30" onChange={(e) => {setNewCardName(e.target.value)}} required />
          <span className="edit-form__field-error place-name-input-error"></span>
          <input id="place-link-input" name="link" className="edit-form__field edit-form__field_type_place-link"
            type="URL" value={newCardLink} placeholder="Ссылка на картинку" onChange={(e) => {setNewCardLink(e.target.value)}} required />
          <span className="edit-form__field-error place-link-input-error"></span>
        </PopupWithForm>
    )
}