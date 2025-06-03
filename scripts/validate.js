document.addEventListener("DOMContentLoaded", () => {
  //  VALIDACAO FORM EDITAR PERFIL
  const nameInput = document.getElementById("popup-name-input");
  const descriptionInput = document.getElementById("popup-description-input");
  const nameError = document.getElementById("name-error");
  const descriptionError = document.getElementById("description-error");
  const saveButton = document.querySelector("#popup-form .popup__submit");
  const editButton = document.querySelector(".profile__edit-button");
  const profileName = document.querySelector(".profile__user-name");
  const profileDescription = document.querySelector(".profile__description");
  const popup = document.getElementById("popup-edit-profile");

  function validateInput(input, errorElement) {
    if (!input.validity.valid) {
      errorElement.textContent = input.validationMessage;
    } else {
      errorElement.textContent = "";
    }
  }

  function toggleButtonState() {
    if (nameInput.validity.valid && descriptionInput.validity.valid) {
      saveButton.disabled = false;
      saveButton.classList.remove("popup__submit_disabled");
    } else {
      saveButton.disabled = true;
      saveButton.classList.add("popup__submit_disabled");
    }
  }

  nameInput.addEventListener("input", () => {
    validateInput(nameInput, nameError);
    toggleButtonState();
  });

  descriptionInput.addEventListener("input", () => {
    validateInput(descriptionInput, descriptionError);
    toggleButtonState();
  });

  editButton.addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;

    validateInput(nameInput, nameError);
    validateInput(descriptionInput, descriptionError);
    toggleButtonState();

    popup.classList.add("popup_opened");
    nameInput.focus();
  });

  // Inicializa botão desabilitado
  toggleButtonState();

  // VALIDACAO FORM NOVO LOCAL
  const formAddCard = document.getElementById("form-add-card");
  const titleInput = formAddCard.elements.name;
  const linkInput = formAddCard.elements.link;
  const titleError = document.getElementById("title-error");
  const linkError = document.getElementById("link-error");
  const submitButton = formAddCard.querySelector(".popup__submit");
  const addCardPopup = document.getElementById("popup-add-card");
  const titleMinLength = 2;
  const titleMaxLength = 30;

  function validateTitle() {
    const value = titleInput.value.trim();
    if (value.length < titleMinLength || value.length > titleMaxLength) {
      titleInput.setCustomValidity(
        "O título deve conter entre 2 e 30 caracteres."
      );
      titleError.textContent = titleInput.validationMessage;
    } else {
      titleInput.setCustomValidity("");
      titleError.textContent = "";
    }
  }

  function validateLink() {
    // Limpa a mensagem customizada antes de verificar validade
    linkInput.setCustomValidity("");

    if (!linkInput.validity.valid) {
      if (linkInput.validity.typeMismatch) {
        linkInput.setCustomValidity("Por favor, insira uma URL válida.");
      }
      linkError.textContent = linkInput.validationMessage;
    } else {
      linkError.textContent = "";
    }
  }

  function toggleSubmitButton() {
    if (formAddCard.checkValidity()) {
      submitButton.disabled = false;
      submitButton.classList.remove("popup__submit_disabled");
    } else {
      submitButton.disabled = true;
      submitButton.classList.add("popup__submit_disabled");
    }
  }

  titleInput.addEventListener("input", () => {
    validateTitle();
    toggleSubmitButton();
  });

  linkInput.addEventListener("input", () => {
    validateLink();
    toggleSubmitButton();
  });

  // Inicializa botão desabilitado
  validateTitle();
  validateLink();
  toggleSubmitButton();

  // Quando abrir popup "Novo local", limpa erros e botão
  document
    .querySelector(".profile__add-button")
    .addEventListener("click", () => {
      titleError.textContent = "";
      linkError.textContent = "";
      submitButton.disabled = true;
      submitButton.classList.add("popup__submit_disabled");
    });

  formAddCard.addEventListener("submit", (event) => {
    if (!formAddCard.checkValidity()) {
      event.preventDefault();
    }
  });
});
