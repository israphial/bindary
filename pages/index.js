import * as consts from "../utils/consts.js";
import { Keybind } from "../components/Keybind.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Validator } from "../components/Validator.js";
import { Timer } from "../components/Timer.js";
import { PopupDelete } from "../components/PopupDelete.js";
import { PopupOptions } from "../components/PopupOptions.js";

// Constants
//---------------------------------

const currentInstantiatedKeybinds = [];
const keybindInformationContainer = document.querySelector(".content__list");
const addKeybindForm = document.querySelector(".form_type_add-keybind");
const addTimerForm = document.querySelector(".form_type_add-timer");
const timerContainer = document.querySelector(".timer-container");
const timerTemplate = document.querySelector(".template_type_timer");

// Callbacks and helpers
//---------------------------------

const clearOtherKeybinds = () => {
  currentInstantiatedKeybinds.forEach((keybindClass) => {
    keybindClass.removeAllKeybindListeners();
  });
};

const restoreOtherKeybinds = () => {
  currentInstantiatedKeybinds.forEach((keybindClass) => {
    keybindClass.setKeybindListeners();
  });
};

const makeNewKeybindCallback = () => {
  addKeybindPopup.openPopup();

  const keybindsArray = currentKeybindKeys();
  newKeybindValidator.keybindComparisonHandler(keybindsArray);
};

const actionCallback = (actionInformation) => {
  const actionObject = actionInformation;
  if (actionObject.type == "New keybind") {
    makeNewKeybindCallback();
  }
  if (actionObject.type === "Javascript event") {
    const actionBody = actionObject.body;
    const bodyFunction = new Function(actionBody);
    bodyFunction();
  }
  if (actionObject.type == "timer") {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    addTimerPopup.openPopup();
    // TODO: add validator when it's ready
  }
  if (actionObject.type == "delete") {
    deleteKeybindPopup.setCurrentKeybinds(currentInstantiatedKeybinds);
    deleteKeybindPopup.openPopup();
  }
  if (actionObject.type == "options") {
    optionsPopup.openPopup();
  }
};

const deleteKeybindCallback = (keybindObject) => {
  const listItems = document.querySelectorAll(".content__list-item-hotkey");
  // receives the assoc keybind object from PopupDelete, use this to delete the assoc. keybind, remove from arrays, edit cached array, remove from dom, remove listener for this keybind
  if (keybindObject !== undefined) {
    const keybindToDelete = keybindObject;

    keybindToDelete.removeAllKeybindListeners();
    const removedKeybindIndex =
      currentInstantiatedKeybinds.indexOf(keybindToDelete);
    currentInstantiatedKeybinds.splice(removedKeybindIndex, 1);

    const targetIndex = consts.presetHotkeysArray.findIndex(
      (keybindArrObject) => {
        return keybindArrObject.keyBind == keybindObject.keybind;
      }
    );
    consts.presetHotkeysArray.splice(targetIndex, 1);

    listItems.forEach((listItem) => {
      if (
        listItem.textContent == keybindToDelete.keybind.toUpperCase() ||
        listItem.textContent == keybindToDelete.keybind
      ) {
        listItem.parentNode.remove();
      }
    });
  } else {
    console.log(
      `Error: keybindObject is an unexpected value (should be equal to a Keybind object): ${keybindObject}`
    );
  }
  /*
    1. delete keybind object from currentInstantiatedKeybinds - done
    2. delete keybind object from consts.presetHotkeysArray - done
    3. edit cached array
    4. remove listener for this keybind - done
    5. delete this keybind instance from memory - done?
    6. remove associated list item from dom - done
    7. send updated arrays to wherever they're needed in order to "reload" things
  */
};

const renderInformation = ({ keybindObject }) => {
  const newDescriptor = document.createElement("li");
  const hotkeyDisplay = document.createElement("span");
  const descriptorDisplay = document.createElement("span");

  newDescriptor.classList.add("content__list-item");
  hotkeyDisplay.classList.add("content__list-item-hotkey");
  descriptorDisplay.classList.add("content__list-item-descriptor");

  hotkeyDisplay.textContent = `${keybindObject.keyBind.toUpperCase()}`;
  descriptorDisplay.textContent = `${keybindObject.description}`;
  newDescriptor.append(hotkeyDisplay);
  newDescriptor.append(descriptorDisplay);

  keybindInformationContainer.append(newDescriptor);
};

const currentKeybindKeys = () => {
  const keybindKeysArray = [];
  currentInstantiatedKeybinds.forEach((keybind) => {
    keybindKeysArray.push(keybind.keybind);
  });
  return keybindKeysArray;
};

// Initialization and instantiation
//---------------------------------

const newKeybindValidator = new Validator(addKeybindForm);
const newTimerValidator = new Validator(addTimerForm);
newKeybindValidator.enableLiveValidation();
newTimerValidator.enableLiveValidation();

const addKeybindPopup = new PopupWithForm(
  consts.newKeybindPopup,
  (keybindObject) => {
    // callback for when form is submitted; keybindObj is received by setEventListeners>_getInputValues return
    const newKeybind = new Keybind(
      { keybindObject },
      clearOtherKeybinds,
      restoreOtherKeybinds,
      makeNewKeybindCallback,
      actionCallback
    );
    newKeybind.setKeybindListeners();
    if (keybindObject.action) {
      newKeybind.setActionCallback(actionCallback);
    }
    currentInstantiatedKeybinds.push(newKeybind);
    renderInformation({ keybindObject });
    addKeybindPopup.closePopup();
  },
  clearOtherKeybinds,
  restoreOtherKeybinds
);
addKeybindPopup.setEventListeners();

const addTimerPopup = new PopupWithForm(
  consts.newTimerPopup,
  (timerInfo) => {
    if (timerInfo !== null) {
      const timer = new Timer(timerContainer, timerTemplate, timerInfo);
      timer.run();
    }
    addTimerPopup.closePopup();
  },
  clearOtherKeybinds,
  restoreOtherKeybinds
);
addTimerPopup.setEventListeners();

const deleteKeybindPopup = new PopupDelete(
  consts.deleteKeybindPopup,
  currentInstantiatedKeybinds,
  clearOtherKeybinds,
  restoreOtherKeybinds,
  (keybindObject) => {
    deleteKeybindCallback(keybindObject);
    deleteKeybindPopup.closePopup();
  }
);
deleteKeybindPopup.setEventListeners();

const optionsPopup = new PopupOptions(
  consts.optionsPopup,
  clearOtherKeybinds,
  restoreOtherKeybinds
);
optionsPopup.setEventListeners();

function instantiatePresetKeybinds() {
  consts.presetHotkeysArray.forEach((keybindObject) => {
    const keybind = new Keybind(
      { keybindObject },
      clearOtherKeybinds,
      restoreOtherKeybinds,
      makeNewKeybindCallback,
      actionCallback
    );

    currentInstantiatedKeybinds.push(keybind);
    renderInformation({ keybindObject });
  });

  return currentInstantiatedKeybinds.forEach((keybindClass) => {
    keybindClass.setKeybindListeners();
  });
}

instantiatePresetKeybinds();
