import { useContext, useEffect, useState } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm"

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);

    }, [currentUser, isOpen]);

    function handleSubmit() {
        onUpdateUser({
            name,
            about: description,
        })
    }

    return (
        <PopupWithForm
          name="info-edit"
          title="Редактировать профиль"
          buttonText="Сохранить"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          >
            
          <input id="name-input" name="name" className="edit-form__field edit-form__field_type_name" type="text"
            value={name} placeholder="Ваше имя" minLength="2" maxLength="40" onChange={(e) => setName(e.target.value)} required />
          <span className="edit-form__field-error name-input-error"></span>
          <input id="description-input" name="about"
            className="edit-form__field edit-form__field_type_description" type="text" value={description}
            placeholder="Профессия" minLength="2" maxLength="200" onChange={(e) => setDescription(e.target.value)} required />
          <span className="edit-form__field-error description-input-error"></span>
        </PopupWithForm>
    )
}