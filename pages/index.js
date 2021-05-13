import * as consts from "../utils/consts.js";
import { Keybind } from "../components/Keybind.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Validator } from "../components/Validator.js";
import { Timer } from "../components/Timer.js";

/*
    TODO:
    
    Issues/bugs:
      **-** link should be changed to be an action instead of its current setup
        - the 'none' option will need to be removed for actions, and the <select> tag will need to be required
        - make the link input appear below the select element if 'link' option is selected, and make it required
      - New bind popup: when an action other than none is selected, the link input needs to be disabled and cleared
      - No way to create submenus: selecting "submenu" as an action should do something to allow the user to add links to a submenu tied to the user's designated key
      - Validators don't work properly for most fields currently, finish setting this up
      - Popup open/close anims don't work; unknown cause
      - Popup close buttons do nothing; need to tie them to closePopup in setEventListeners

    
    Features/plans:

    - UI Reactions
      - UI reacts to changes more. Pressing N pulses or emphasizes the list container describing what N does, for instance. 
      - Timer additions have an animation, drawing the user's eyes to the element on the screen. Perhaps a floating popup could appear for a few seconds saying "timer added!"

    - Github Pages pre-setup
      - Clean up and organize Keybind.js
      - Finish new bind functionality, make sure to handle for submenus in the form too
      - Submenu creation functionality
          - Make binds removable
          - Set up a way to cache the presetHotkeysArray and fetch it on load; "new users" should see the preset hotkeys array. Basically, clean slate until you've made binds
          - removing a bind should remove it from the cached array resource too, so that it's not there on reload
      - First time visit popup

*/

// Constants
//---------------------------------

const currentInstantiatedKeybinds = [];
const keybindInformationContainer = document.querySelector(".content__list");
const addKeybindForm = document.querySelector(".form_type_add-keybind");
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
    addTimerPopup.openPopup();
    // TODO: add validator when it's ready
  }
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
newKeybindValidator.enableLiveValidation();

Notification.requestPermission();

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
