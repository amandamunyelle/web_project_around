const editButton = document.querySelector(".profile__edit-button");
const popup = document.getElementById("popup-edit-profile");
const closeButton = document.getElementById("popup-close-btn");
const form = document.getElementById("popup-form");
const nameInput = document.getElementById("popup-name-input");
const descriptionInput = document.getElementById("popup-description-input");
const profileName = document.querySelector(".profile__user-name");
const profileDescription = document.querySelector(".profile__description");

// Abrir popup e preencher campos
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  popup.classList.add("popup_opened");
});

// Fechar popup
closeButton.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});

// Submeter formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popup.classList.remove("popup_opened");
});
