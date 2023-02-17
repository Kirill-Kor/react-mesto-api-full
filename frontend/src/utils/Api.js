import { checkResponse } from "./checkResponse";

class Api {
  constructor(options) {
    this._options = {...options};

  }
  _fetch(path, method = "GET", body) {
    return fetch(`${this._options.baseUrl}${path}`, { headers: {
      ...this._options.headers,
        "Authorization" : `Bearer ${localStorage.getItem('jwt')}`
      }, method: method, body: body, })
      .then(checkResponse)
  }

  getInitialCards() {
    return this._fetch('cards');
  }

  getUserInfo() {
    return this._fetch('users/me');
  }

  patchUserInfo({name, about}) {
    return this._fetch('users/me', "PATCH", JSON.stringify({name: name, about: about}));
  }

  addNewCard({name, link}) {
    return this._fetch('cards', "POST",JSON.stringify({name: name, link: link}));
  }

  deleteCard(cardId) {
    return this._fetch('cards/' + cardId, "DELETE");
  }

  setLike(cardId) {
    return this._fetch('cards/' + cardId + '/likes', "PUT");
  }

  deleteLike(cardId) {
    return this._fetch('cards/' + cardId + '/likes', "DELETE");
  }

  patchUserAvatar(avatarLink) {
    return this._fetch('users/me/avatar', "PATCH", JSON.stringify({avatar: avatarLink}));
  }
}

const api = new Api({
  baseUrl: 'https://api.kirkors.mesto.nomoredomains.work/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
