import Section from "./components/Section.js";
import Card from "./components/Card.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import FormValidator from "./components/FormValidator.js";
import { initialCards } from "./components/utils.js";

// Seletores
const selectors = {
  profileName: ".profile__user-name",
  profileDescription: ".profile__description",
  cardsContainer: ".elements__cards",
  cardTemplate: "#card-template",
  popupEditProfile: "#popup-edit-profile",
  popupAddCard: "#popup-add-card",
  popupImage: "#popup-image",
  profileEditButton: ".profile__edit-button",
  profileAddButton: ".profile__add-button",
};

// Config de validação
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__form-error_visible",
};

// Formulários
const formEditProfile = document.querySelector(
  `${selectors.popupEditProfile} .popup__form`
);
const formAddCard = document.querySelector(
  `${selectors.popupAddCard} .popup__form`
);

// Validadores
const validatorEditProfile = new FormValidator(
  validationConfig,
  formEditProfile
);
const validatorAddCard = new FormValidator(validationConfig, formAddCard);
validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();

// Instância do UserInfo
const userInfo = new UserInfo({
  nameSelector: selectors.profileName,
  descriptionSelector: selectors.profileDescription,
});

// Popup de imagem
const popupWithImage = new PopupWithImage(selectors.popupImage);
popupWithImage.setEventListeners();

// Função para criar um card
function createCard(data) {
  const card = new Card(data, selectors.cardTemplate, (dataForPopup) => {
    popupWithImage.open(dataForPopup);
  });
  return card.generateCard();
}

// Seção dos cards
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsSection.addItem(cardElement);
    },
  },
  selectors.cardsContainer
);
cardsSection.renderItems();

// Popup editar perfil
const popupEditProfile = new PopupWithForm(
  selectors.popupEditProfile,
  (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      description: formData.description,
    });
    popupEditProfile.close();
  }
);
popupEditProfile.setEventListeners();

// Popup adicionar cartão
const popupAddCard = new PopupWithForm(selectors.popupAddCard, (formData) => {
  const newCard = createCard({ name: formData.name, link: formData.link });
  cardsSection.addItem(newCard);
  popupAddCard.close();
});
popupAddCard.setEventListeners();

// Botão: abrir popup de editar perfil
document
  .querySelector(selectors.profileEditButton)
  .addEventListener("click", () => {
    const currentUserInfo = userInfo.getUserInfo();

    formEditProfile.elements.name.value = currentUserInfo.name;
    formEditProfile.elements.description.value = currentUserInfo.description;

    validatorEditProfile.resetValidation();
    popupEditProfile.open();
  });

// Botão: abrir popup de adicionar cartão
document
  .querySelector(selectors.profileAddButton)
  .addEventListener("click", () => {
    formAddCard.reset();
    validatorAddCard.resetValidation();
    popupAddCard.open();
  });
