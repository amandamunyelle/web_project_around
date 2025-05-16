const editButton = document.querySelector(".profile__edit-button");
const popup = document.getElementById("popup-edit-profile");
const closeButton = document.getElementById("popup-close-btn");
const form = document.getElementById("popup-form");
const nameInput = document.getElementById("popup-name-input");
const descriptionInput = document.getElementById("popup-description-input");
const profileName = document.querySelector(".profile__user-name");
const profileDescription = document.querySelector(".profile__description");

// Editar profile
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popup.classList.add("popup_opened");
  nameInput.focus();
});

closeButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popup.classList.remove("popup_opened");
});

const addCardPopup = document.getElementById("popup-add-card");
const addCardButton = document.querySelector(".profile__add-button");
const addCardForm = document.getElementById("form-add-card");
const inputPlaceName = addCardForm.elements.name;
const inputPlaceLink = addCardForm.elements.link;

//Abrir popup
addCardButton.addEventListener("click", () => {
  addCardPopup.classList.add("popup_opened");
});

//Fechar popup
addCardPopup.querySelector(".popup__close").addEventListener("click", () => {
  addCardPopup.classList.remove("popup_opened");
});

//Adicionar novo cartão
addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = inputPlaceName.value;
  const link = inputPlaceLink.value;
  const newCard = createCard(name, link);
  cardList.prepend(newCard);
  addCardPopup.classList.remove("popup_opened");
  addCardForm.reset();
});

// Elementos iniciais

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const cardList = document.querySelector(".elements__cards");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector(".elements__image");
  const titleElement = cardElement.querySelector(".elements__text");
  const likeButton = cardElement.querySelector(".elements__like");
  const deleteButton = cardElement.querySelector(".elements__delete");

  imageElement.src = link;
  imageElement.alt = name;
  titleElement.textContent = name;

  // Curtir
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("elements__like_active");
  });

  // Deletar
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // Abrir imagem ampliada
  imageElement.addEventListener("click", () => {
    const popupImage = document.querySelector(".popup-image__img");
    const popupCaption = document.querySelector(".popup__caption");
    const imagePopup = document.getElementById("popup-image");

    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    imagePopup.classList.add("popup_opened");
  });

  return cardElement;
}

// Renderizar os cartões iniciais
initialCards.forEach((card) => {
  const newCard = createCard(card.name, card.link);
  cardList.append(newCard);
});

/// Fechar imagem ampliada
document
  .querySelector(".popup-image__close-button")
  .addEventListener("click", () => {
    document.getElementById("popup-image").classList.remove("popup_opened");
  });
