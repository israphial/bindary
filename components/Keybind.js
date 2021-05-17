export class Keybind {
  constructor(
    { keybindObject },
    clearOtherKeybindsCallback,
    resetOtherKeybindsCallback,
    newKeybindCallback,
    actionCallback
  ) {
    this._title = keybindObject.title;
    this.keybind = keybindObject.keyBind;
    this._description = keybindObject.description;
    this._link = keybindObject.link;
    if (keybindObject.subHotkeys) {
      this._subHotkeys = keybindObject.subHotkeys;
    }
    if (keybindObject.action) {
      this._action = keybindObject.action;
    }
    this._clearOtherKeybindsCallback = clearOtherKeybindsCallback;
    this._resetOtherKeybindsCallback = resetOtherKeybindsCallback;
    this._newKeybindCallback = newKeybindCallback;
    if (typeof actionCallback !== "undefined") {
      this._actionCallback = actionCallback;
    }
    if (keybindObject.protected) {
      this.protected = true;
    }
    this._overlay = document.querySelector(".popup__overlay");
    this._isActivated = this._isActivated.bind(this);
    this._submenuBindsChecker = this._submenuBindsChecker.bind(this);
    this._setSubmenuBinds = this._setSubmenuBinds.bind(this);
  }

  _getPopup() {
    return document.querySelector(".popup_type_information"); // get the info popup
  }

  _setSubmenuBinds() {
    this.removeAllKeybindListeners();
    this._clearOtherKeybindsCallback(); // remove other class' keybinds to set these subHotkey keybinds
    document.addEventListener("keyup", this._submenuBindsChecker);
  }

  _submenuBindsChecker(evt) {
    // !!! not efficient, redo this !!!
    if (evt.key == "Escape") {
      this._handleEscPressed(evt);
    }
    this._subHotkeys.forEach((item) => {
      if (evt.key == item.keyBind) {
        window.open(item.link);
        this.removeSubKeybindListeners();
        this.closePopup();
        this._resetOtherKeybindsCallback();
      }
    });
  }

  _handleSubmenu() {
    this.openPopup();
    this._setSubmenuBinds();
  }

  _isActivated(evt) {
    if (evt.key === this.keybind) {
      if (this._action !== undefined) {
        this._actionCallback(this._action);
      }
      if (this._subHotkeys !== undefined) {
        this._handleSubmenu();
        this._setSubmenuBinds(evt);
      }
      if (this._subHotkeys == undefined && this._link !== undefined) {
        window.open(this._link);
      }
    }
  }

  _handleEscPressed(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
      this.removeSubKeybindListeners();
      this._resetOtherKeybindsCallback(); // set the base keybinds
    }
  }

  setActionCallback(actionCallback) {
    this._actionCallback = actionCallback;
  }

  setKeybindListeners() {
    document.addEventListener("keyup", this._isActivated);
  }

  removeAllKeybindListeners() {
    document.removeEventListener("keyup", this._isActivated);
  }

  removeSubKeybindListeners() {
    document.removeEventListener("keyup", this._submenuBindsChecker);
  }

  setEventListeners() {
    this._closeButton = this._newSubmenu.querySelector(".popup__close-button");
    this._closeButton.addEventListener("click", this.closePopup.bind(this));
  }

  openPopup() {
    this._newSubmenu = this._getPopup();
    this._newSubmenu.querySelector(".popup__header").textContent = this._title;
    this._subHotkeys.forEach((description) => {
      const newDescriptor = document.createElement("p");
      newDescriptor.classList.add("popup__description");
      newDescriptor.textContent = `${description.keyBind}: ${description.description}`;
      this._newSubmenu.append(newDescriptor);
    });
    this._newSubmenu.classList.add("popup_visible");
    this._overlay.classList.add("popup__overlay_visible");
    this.setEventListeners();
  }

  closePopup() {
    const submenuPopup = this._getPopup();

    submenuPopup
      .querySelectorAll(".popup__description")
      .forEach((item) => item.remove());

    submenuPopup.classList.remove("popup_visible");
    this._overlay.classList.remove("popup__overlay_visible");
  }
}
