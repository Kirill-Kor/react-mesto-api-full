import { useEffect, useState } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup'
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { checkTokenValidity } from '../utils/Auth';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);


  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [userEmail, setUserEmail] = useState('');

  const [currentUser, setCurrentUser] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();


  const [cardsArray, setCardsArray] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            handleLogin();
        }
    }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    isLiked
      ? api.deleteLike(card._id)
        .then(newCard => {
          setCardsArray(cardsArray => cardsArray.map(c => c._id === card._id ? newCard : c))
        })
        .catch(error => {
          console.log(error);
        })
      : api.setLike(card._id)
        .then(newCard => {
          setCardsArray(cardsArray => cardsArray.map(c => c._id === card._id ? newCard : c))
        })
        .catch(error => {
          console.log(error);
        })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCardsArray(cardsArray => cardsArray.filter(c => {
          if (c._id !== card._id)
            return c;
        }))
      })
      .catch(error => {
        console.log(error);
      })
  }

  function getUserInfo() {
    api.getUserInfo()
        .then((user) => {
          setCurrentUser(user);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
        })
  }

  function getCards() {
    api.getInitialCards()
        .then((cards) => {
          setCardsArray(cards);
        })
        .catch(error => {
          console.log(error);
        })
  }

  function handleLogin() {
    checkTokenValidity()
      .then((response) => {
        setLoggedIn(true);
        setUserEmail(response.email);
        getCards();
        getUserInfo();
        history.push('/');
      })
      .catch(error => console.log(error));
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    api.patchUserInfo({ name, about })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      })
  }

  function handleUpdateAvatar(avatarLink) {
    api.patchUserAvatar(avatarLink)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      })
  }

  function handleAddPlace({ name, link }) {
    api.addNewCard({ name, link })
      .then((newCard) => {
        setCardsArray([newCard, ...cardsArray]);
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (

    <div className="container">

      <Switch> 
      
        <ProtectedRoute exact path="/" loggedIn={loggedIn}>
          <Header text="Выйти" onLogout={handleLogout} isLoggedIn={loggedIn} email={userEmail} />
          <CurrentUserContext.Provider value={currentUser || ''}>
            <Main onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cardsArray}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              isLoading={isLoading}
            />
            {isEditAvatarPopupOpen &&
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar} />
            }

            {isEditProfilePopupOpen &&
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              />
            }
          </CurrentUserContext.Provider>
          {isAddPlacePopupOpen &&
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlace}
            />}

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />
          <Footer />
        </ProtectedRoute>

        <Route path="/sign-in">
          <Header text="Регистрация" onClose={closeAllPopups} onLoginPage />
          <Login onLogin={handleLogin}></Login>
        </Route>

        <Route path="/sign-up">
          <Header text="Войти" />
          <Register></Register>
        </Route>

      </Switch>

    </div>

  );
}

export default App;
