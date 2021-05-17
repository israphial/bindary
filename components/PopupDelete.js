export class PopupDelete {
  constructor(
    popupSelector,
    currentKeybinds,
    disableAllKeybindsCallback,
    enableAllKeybindsCallback,
    deleteSubmissionCallback
  ) {
    this._popupSelector = popupSelector;
    this._currentKeybinds = currentKeybinds;
    this._disableAllKeybindsCallback = disableAllKeybindsCallback;
    this._enableAllKeybindsCallback = enableAllKeybindsCallback;
    this._deleteSubmissionCallback = deleteSubmissionCallback;
    this._closeButton = this._popupSelector.querySelector(
      ".popup__close-button"
    );
    this._form = this._popupSelector.querySelector(".form");
    this._formSelect = this._form.querySelector(
      ".form__input_type_delete-keybind-select"
    );
    this._saveButton = this._form.querySelector(".form__save-button");
    this._popupError = this._popupSelector.querySelector(".popup__error");
    this._overlay = document.querySelector(".popup__overlay");
    this._handleEscPressed = this._handleEscPressed.bind(this);
  }

  _makeKeybindOption(keybind) {
    if (!keybind.protected) {
      const keybindOption = document.createElement("option");
      Object.assign(keybindOption, {
        className: "form__input form__input_type_radio",
        id: `form__input_type_key_${keybind.keybind}`,
        value: `${keybind.keybind}`,
      });
      keybindOption.textContent = `${keybind.keybind} - ${keybind._title}`;
      this._formSelect.appendChild(keybindOption);
    }
  }

  _handleFormPropagate() {
    this._currentKeybinds.forEach((keybind) => {
      this._makeKeybindOption(keybind);
    });
    if (!this._formSelect.hasChildNodes()) {
      this._formSelect.setAttribute("disabled", true);
      this._saveButton.setAttribute("disabled", true);
      this._saveButton.classList.add("form__save-button_disabled");
      this._showError();
    }
  }

  _handleFormCleanup() {
    while (this._formSelect.firstChild) {
      this._formSelect.removeChild(this._formSelect.lastChild);
    }
  }

  _handleEscPressed(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  _getKeybind() {
    // use this to return the option value to the submit callback
    this._keybindInput = this._form.querySelector(".form__input");
    this._keybindInformation = this._keybindInput.value;
    const selectedKeybind = this._currentKeybinds.find((keybindObject) => {
      if (
        keybindObject.keybind == this._keybindInformation &&
        !keybindObject.hasOwnProperty("protected")
      ) {
        return keybindObject;
      }
    });
    return selectedKeybind;
  }

  _showError() {
    this._popupError.textContent = `No keybinds available for deletion`;
    this._popupError.style.display = "block";
  }

  _hideError() {
    this._popupError.textContent = "";
    this._popupError.style.display = "none";
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this.closePopup.bind(this));
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._deleteSubmissionCallback(this._getKeybind());
    });
  }

  setCurrentKeybinds(keybinds) {
    this._currentKeybinds = keybinds;
  }

  openPopup() {
    this._hideError();
    this._formSelect.removeAttribute("disabled");
    this._saveButton.removeAttribute("disabled");
    this._saveButton.classList.remove("form__save-button_disabled");
    this._popupSelector.classList.add("popup_visible");
    this._overlay.classList.add("popup__overlay_visible");
    this._popupSelector.setAttribute("tabindex", 0);
    this._closeButton.setAttribute("tabindex", 0);
    this._disableAllKeybindsCallback();
    document.addEventListener("keyup", this._handleEscPressed);
    this._handleFormPropagate();
  }

  closePopup() {
    this._form.reset();
    this._popupSelector.classList.remove("popup_visible");
    this._overlay.classList.remove("popup__overlay_visible");
    this._popupSelector.removeAttribute("tabindex");
    this._closeButton.removeAttribute("tabindex");
    document.removeEventListener("keyup", this._handleEscPressed);
    this._handleFormCleanup();
    this._enableAllKeybindsCallback();
  }
}
