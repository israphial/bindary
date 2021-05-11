import * as consts from "../utils/consts.js";
import { Keybind } from "../components/Keybind.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { Validator } from "../components/Validator.js";
import { Timer } from "../components/Timer.js";

/*
    TODO:

      - UI Reactions
        - UI reacts to changes more. Pressing N pulses or emphasizes the list container describing what N does, for instance. 
        - Timer additions have an animation, drawing the user's eyes to the element on the screen. Perhaps a popup could appear for a few seconds saying "timer added!" too

      - Flesh out validator and add it for all input forms; at the moment none of the inputs have actual validation.

      - Popup revamp
        - Add submenu functionality - figure out how to structure this first though. Maybe put a submenu button in the form:
          - Disables the link input and action radio buttons and sets their values to ""
          - Opens another popup that allows user to make submenu binds - perhaps a plus button could be there and when pressed, a form opens to put info into
          - There needs to be a functionality that handles adding the submenu objects to a submenu array of the bind object, then push that to the array
        - Update popups to match the new global theme
        - Add close button functionality
        - Open/close animation refuses to apply - look into this
        - Adjust visual layout of radio buttons
        - Add a box shadow on active form elements alongside the green border
        - There should probably be a Popup class that other popups inherit from

      - Timer action:
        - Update timer+container styling to match the new global theme
        - Make sure it only takes a number, and keep the number below 4 char length
        - Handle Notification permission devtools warning; a gesture needs to trigger asking for permission. Pressing t for the first time asks for permission? 

      - Add input checker for prompt popups like google search/weather, so that no action is performed if the prompt is closed or an empty string is submitted to it
      
      - Ability to remove binds
        - First remove from array, then li from DOM, and remove from cached resources too
        - del key for remove? Opens a popup with all stored binds, each with a delete button next to each?

      - New preset bind: New Note. 
        - Opens a popup that asks for title+description. 
        - Enable Live validation class for the form
        - Notes should be delete-able. Maybe also clickable to edit, add comments to (perhaps the note object could store a comments array?), expand to full size, and delete.
        - Notes should be stored in cache and on page load, check if there are any notes to load. Don't load anything if the array is empty. 
        - Perhaps note container could be collapsible/expandable via a default keybind and navigable by arrow keys. Maybe "selecting" a note (being focused on it) would enable binds for it,
            such as delete note, edit note

      - Actions. Actions are pre-defined behaviors that can be bound to new keys. For example, fetch weather could be a bindable action. Actions should probably be classes.
        - INFO: Actions are set up right now so that you can select the type of object to bind to a key. Calling that action invokes it in actionCallback
        - Fetch weather information (requires zipcode) (could use a google search for this)
        - Make the new note behavior a bindable action
        - What else? 

      - App Options
        - Gear icon somewhere on the page that opens the options menu popup
        - Bound to o
        - Option to restore to the preset binds array (like a restore to defaults button)
          - Should have a red confirmation popup, as doing this will wipe out the current binds that the user has
        - UI color change
        - Perhaps keybind deletion should be done through the options menu
      
      - Github Pages host pre-setup
        - Remove all API information and personally identifiable info first - DONE
        - Clean up and organize Keybind.js, try to reduce verbosity? 
        - Finish new bind functionality, make sure to handle for submenus in the form too -
            - New bind functionality - DONE
            - Submenu creation functionality
        - Make binds removable
        - Set up a way to cache the presetHotkeysArray and fetch it on load; "new users" should see the preset hotkeys array. Basically, clean slate until you've made binds
        - removing a bind should remove it from the cached array resource too, so that it's not there on reload. 

      - First time visit popup; shows default keybinds (N for new note, W for weather, A for add keybind)

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
  // callback to disable the base keybinds of the program for sub-keybind assignment
  currentInstantiatedKeybinds.forEach((keybindClass) => {
    keybindClass.removeAllKeybindListeners(); // removes the keybinds of the other keybind classes, allowing the current keybind to write over them if necessary
  });
};

const restoreOtherKeybinds = () => {
  // callback to re-set the base keybinds
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

    currentInstantiatedKeybinds.push(keybind); // add the newly instantiated keybind object to the keybinds array
    renderInformation({ keybindObject });
  });

  return currentInstantiatedKeybinds.forEach((keybindClass) => {
    keybindClass.setKeybindListeners();
  });
}

instantiatePresetKeybinds();
