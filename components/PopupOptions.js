export class PopupOptions {
  constructor(
    popupSelector,
    disableAllKeybindsCallback,
    enableAllKeybindsCallback,
    resetPresetsCallback
  ) {
    this._popupSelector = popupSelector;
    this._disableAllKeybindsCallback = disableAllKeybindsCallback;
    this._enableAllKeybindsCallback = enableAllKeybindsCallback;
    this._resetPresetsCallback = resetPresetsCallback;
    this._overlay = document.querySelector(".popup__overlay");
    this._actionButtons = Array.from(
      this._popupSelector.querySelectorAll(".popup__action-button")
    );
    this._handleEscPressed = this._handleEscPressed.bind(this);
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
    this._resetKeybindsButton = this._popupSelector.querySelector(
      ".popup__action-button_type_reset-presets"
    );
    this._closeButton.addEventListener("click", this.closePopup.bind(this));
    this._resetKeybindsButton.addEventListener(
      "click",
      this._resetPresetsCallback
    );
  }

  openPopup() {
    this._popupSelector.classList.add("popup_visible");
    this._overlay.classList.add("popup__overlay_visible");
    this._popupSelector.setAttribute("tabindex", 0);
    this._closeButton.setAttribute("tabindex", 0);
    this._actionButtons.forEach((button) => button.setAttribute("tabindex", 0));
    this._disableAllKeybindsCallback();
    document.addEventListener("keyup", this._handleEscPressed);
  }

  closePopup() {
    this._popupSelector.classList.remove("popup_visible");
    this._overlay.classList.remove("popup__overlay_visible");
    this._popupSelector.removeAttribute("tabindex");
    this._closeButton.removeAttribute("tabindex");
    this._actionButtons.forEach((button) =>
      button.removeAttribute("tabindex", 0)
    );
    document.removeEventListener("keyup", this._handleEscPressed);
    this._enableAllKeybindsCallback();
  }
}
