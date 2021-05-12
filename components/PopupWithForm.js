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
          inputField.querySelector("#action-select-none").selected
        ) {
          // There's no action being tied to this key. Do not create an action property. !!!change this once 'link' is an action type!!!
          return; // exit this iteration so that no action keypair is put into the keybind object.
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
        } // otherwise:
        this._inputValues[inputField.name] = inputField.value;
      });
    }

    if (this._popupSelector.classList.contains("popup_type_add-timer")) {
      this._inputValues = this._inputList[0].value;
    }
    return this._inputValues;
  }

  _handleEscPressed(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {
    // add functionality to the close button here too

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._popupSubmissionCallback(this._getInputValues());
    });
  }

  openPopup() {
    this._popupSelector.classList.add("popup_visible");
    this._disableAllKeybindsCallback();
    document.addEventListener("keyup", this._handleEscPressed);
    this._form.querySelector(".form__input").focus();
  }

  closePopup() {
    this._form.reset();
    this._popupSelector.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscPressed);
    this._enableAllKeybindsCallback();
  }
}
