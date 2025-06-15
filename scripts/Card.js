export default class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners(cardElement) {
    const likeButton = cardElement.querySelector(".elements__like");
    const deleteButton = cardElement.querySelector(".elements__delete");
    const imageElement = cardElement.querySelector(".elements__image");

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("elements__like_active");
    });

    deleteButton.addEventListener("click", () => {
      cardElement.remove();
    });

    imageElement.addEventListener("click", () => {
      const popupImage = document.querySelector(".popup-image__img");
      const popupCaption = document.querySelector(".popup__caption");
      const imagePopup = document.getElementById("popup-image");

      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupCaption.textContent = this._name;
      imagePopup.classList.add("popup_opened");
    });
  }

  generateCard() {
    const cardElement = this._getTemplate();
    const imageElement = cardElement.querySelector(".elements__image");
    const titleElement = cardElement.querySelector(".elements__text");

    imageElement.src = this._link;
    imageElement.alt = this._name;
    titleElement.textContent = this._name;

    this._setEventListeners(cardElement);

    return cardElement;
  }
}
