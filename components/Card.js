export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__like")
      .addEventListener("click", () => {
        this._handleLike();
      });

    this._element
      .querySelector(".elements__delete")
      .addEventListener("click", () => {
        this._handleDelete();
      });

    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleCardClick({ link: this._link, name: this._name });
      });
  }

  _handleLike() {
    this._element
      .querySelector(".elements__like")
      .classList.toggle("elements__like_active");
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();

    const cardImage = this._element.querySelector(".elements__image");
    const cardTitle = this._element.querySelector(".elements__text");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
