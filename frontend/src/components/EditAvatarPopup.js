import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const inputRef = useRef();

    function handleSubmit() {
        onUpdateAvatar(inputRef.current.value)
    }


    return (
        <PopupWithForm
          name="new-avatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}>
          <input id="avatar-link-input" name="link" ref={inputRef} className="edit-form__field edit-form__field_type_avatar-link"
            type="URL" value={inputRef.current} placeholder="Ссылка на аватар" onChange={() => { }} required />
          <span className="edit-form__field-error avatar-link-input-error"></span>
        </PopupWithForm>
    )
}