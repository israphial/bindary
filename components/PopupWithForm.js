export class PopupWithForm {
  constructor(
    popupSelector,
    popupSubmissionCallback,
    disableAllKeybindsCallback,
    enableAllKeybindsCallback
  ) {
    this._popupSelector = popupSelector;
    this._popupSubmissionCallback = popupSubmissionCallback; // activated when the form is submitted
    this._disableAllKeybindsCallback = disableAllKeybindsCallback;
    this._enableAllKeybindsCallback = enableAllKeybindsCallback;

    this._form = this._popupSelector.querySelector(".form");
    this._overlay = document.querySelector(".popup__overlay");
    this._saveButton = this._form.querySelector(".form__save-button");
    this._handleEscPressed = this._handleEscPressed.bind(this);
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".form__input");
    this._inputValues = {};
    if (this._popupSelector.classList.contains("popup_type_add-keybind")) {
      // get the input values at the time of submission and pipe them into the submission callback to make a new keybind
      this._inputList.forEach((inputField) => {
        if (
          inputField.type == "select-one" &&
          !inputField.querySelector("#action-select-link")
        ) {
          // deprecate this section
        }
        if (
          inputField.type == "select-one" &&
          inputField.querySelector("#action-select-timer").selected
        ) {
          // action is being tied to this key.
          delete this._inputValues.link;
          this._inputValues[inputField.name] = {
            type: inputField.value,
            body: "",
          };
          return; // break out of this iteration so that the normal object mapping doesn't happen
          // make the action sub-object and put type: ${inputField.value} in it, so that you have an action object, then in that action obj, a type key+value.
        }

        this._inputValues[inputField.name] = inputField.value;
      });
    }

    if (this._popupSelector.classList.contains("popup_type_add-timer")) {
      this._inputValues = this._inputList[0].value;
    }

    if (this._inputValues.hasOwnProperty("link")) {
      if (
        !this._inputValues.link.toString().toLowerCase().includes("http://") &&
        !this._inputValues.link.toString().toLowerCase().includes("https://")
      ) {
        this._inputValues.link = "http://" + this._inputValues.link;
      } // check if link value has http:// or https:// in it and prepend http:// if it doesn't
    }

    return this._inputValues; // end of method
  }

  _handleEscPressed(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._closeButton = this._popupSelector.querySelector(
      ".popup__close-button"
    );
    this._closeButton.addEventListener("click", this.closePopup.bind(this));

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._popupSubmissionCallback(this._getInputValues());
    });
  }

  openPopup() {
    this._popupSelector.classList.add("popup_visible");
    this._overlay.classList.add("popup__overlay_visible");
    this._popupSelector.setAttribute("tabindex", 0);
    this._closeButton.setAttribute("tabindex", 0);
    this._disableAllKeybindsCallback();
    document.addEventListener("keyup", this._handleEscPressed);
    this._saveButton.disabled = true;
    this._saveButton.classList.add("form__save-button_disabled");
    this._form.querySelector(".form__input").focus();
  }

  closePopup() {
    this._form.reset();
    this._popupSelector.classList.remove("popup_visible");
    this._overlay.classList.remove("popup__overlay_visible");
    this._popupSelector.removeAttribute("tabindex");
    this._closeButton.removeAttribute("tabindex");
    document.removeEventListener("keyup", this._handleEscPressed);
    this._enableAllKeybindsCallback();
  }
}
