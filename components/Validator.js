export class Validator {
  constructor(formElement) {
    this._formElement = formElement;
    this._inputFields = this._formElement.querySelectorAll(".form__input");
    this._inputFieldsArray = Array.from(this._inputFields);
    this._buttonElement = this._formElement.querySelector(".form__save-button");
  }

  _showInputError(inputElement, errorMessage = undefined) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    // add the error styles to the inputElement and errorElement span
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    // remove error styles from input and span, hide span
    if (errorElement !== null) {
      errorElement.textContent = "";
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add("form__save-button_disabled");
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove("form__save-button_disabled");
    }
  }

  _hasInvalidInput() {
    return this._inputFieldsArray.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _isValid(inputElement) {
    // check this input element for validity
    if (inputElement.classList.contains("form__input_type_add-keybind-key")) {
      if (this._currentKeybindKeys.includes(inputElement.value)) {
        this._showInputError(inputElement, "This key is already bound");
        inputElement.value = "";
      } else {
        this._hideInputError(inputElement);
      }
    } else {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputFields.forEach((inputField) => {
      // check if the input field is for the key, and if it is, live-validate that field. Do standard validation for the other fields.
      inputField.addEventListener("input", () => {
        this._isValid(inputField);
        this._toggleButtonState();
      });
    });
  }

  keybindComparisonHandler(currentKeybindKeys) {
    this._currentKeybindKeys = currentKeybindKeys;
  }

  enableLiveValidation() {
    this._setEventListeners();
  }
}
