import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./utils.js";

// Configuração de validação
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__form-error_visible",
};

// Formulários
const editForm = document.getElementById("popup-form");
const addCardForm = document.getElementById("form-add-card");

// Instanciar validadores
const editFormValidator = new FormValidator(validationConfig, editForm);
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Elementos do perfil
const editButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.getElementById("popup-edit-profile");
const nameInput = document.getElementById("popup-name-input");
const descriptionInput = document.getElementById("popup-description-input");
const profileName = document.querySelector(".profile__user-name");
const profileDescription = document.querySelector(".profile__description");

// Abrir popup editar perfil e preencher inputs
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popupEditProfile.classList.add("popup_opened");
});

// Fechar popup editar perfil pelo botão X
const closeButtonEdit = document.getElementById("popup-close-btn");
closeButtonEdit.addEventListener("click", () => {
  popupEditProfile.classList.remove("popup_opened");
});

// Salvar edição do perfil
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popupEditProfile.classList.remove("popup_opened");
});

// Adicionar novo cartão
const cardList = document.querySelector(".elements__cards");
const inputPlaceName = addCardForm.elements.name;
const inputPlaceLink = addCardForm.elements.link;
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.getElementById("popup-add-card");

// Função para renderizar cartão
function renderCard(name, link) {
  const card = new Card(name, link, "#card-template");
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);
}

// Renderizar cards iniciais
initialCards.forEach((card) => renderCard(card.name, card.link));

// Abrir popup novo cartão
addCardButton.addEventListener("click", () => {
  addCardPopup.classList.add("popup_opened");
});

// Enviar formulário para adicionar cartão
addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderCard(inputPlaceName.value, inputPlaceLink.value);
  addCardForm.reset();
  addCardPopup.classList.remove("popup_opened");
});

// Popup da imagem ampliada
const popupImage = document.getElementById("popup-image");
const popupImageCloseBtn = document.querySelector(".popup-image__close-button");

popupImageCloseBtn.addEventListener("click", () => {
  popupImage.classList.remove("popup_opened");
});

// Fechar popups clicando no overlay
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("popup_opened");
    }
  });
});

// Fechar popups com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) openedPopup.classList.remove("popup_opened");
  }
});

// Fechar todos os popups pelo botão X
document.querySelectorAll(".popup__close").forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    popup.classList.remove("popup_opened");
  });
});
