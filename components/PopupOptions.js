export class PopupOptions {
  constructor(
    popupSelector,
    disableAllKeybindsCallback,
    enableAllKeybindsCallback
  ) {
    this._popupSelector = popupSelector;
    this._disableAllKeybindsCallback = disableAllKeybindsCallback;
    this._enableAllKeybindsCallback = enableAllKeybindsCallback;
    this._overlay = document.querySelector(".popup__overlay");
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
    this._closeButton.addEventListener("click", this.closePopup.bind(this));
  }

  openPopup() {
    this._popupSelector.classList.add("popup_visible");
    this._overlay.classList.add("popup__overlay_visible");
    this._popupSelector.setAttribute("tabindex", 0);
    this._closeButton.setAttribute("tabindex", 0);
    this._disableAllKeybindsCallback();
    document.addEventListener("keyup", this._handleEscPressed);
  }

  closePopup() {
    this._popupSelector.classList.remove("popup_visible");
    this._overlay.classList.remove("popup__overlay_visible");
    this._popupSelector.removeAttribute("tabindex");
    this._closeButton.removeAttribute("tabindex");
    document.removeEventListener("keyup", this._handleEscPressed);
    this._enableAllKeybindsCallback();
  }
}
