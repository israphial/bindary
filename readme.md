<h1 
style="
    color: #23874b;
    text-align: center;
">
The Bindary</h1>
<br>

<h2>Description and Notice</h2>
<hr>
<p>
    Firstly, THANK YOU for stopping by to look at this project! If you have any suggestions or comments regarding this project, feel free to make a new issue <a href="https://github.com/israphial/bindary/issues">HERE.</a>
    <a style="display: block; color: #23874b;" href="https://israphial.github.io/bindary/">Click here to try the Bindary out!</a>
    The Bindary is a tool I've created that allows the user to navigate around the internet using only their keyboard. When the page first loads, several keybinds are set and are displayed with descriptions. Pressing a listed key performs its associated action. At the moment, the available actions are:
    <ul>
        <li>Open Link</li>
        <li>Make New Keybind</li>
        <li>Start a New Timer</li>
        <li>Rebind Timer Key</li>
    </ul>
    I have plans to create more actions, such as creating notes that will be displayed in a note container on the page, or opening a popup that displays the weather at your current location. There will likely be more actions in the Chrome extension version, as there's a lot that a user may want to do on any given page. 
</p>

<p>
    This release is a VERY early version of a personal project I'm considering making into a portfolio project. It is still actively being developed.
    This was published for peer review of some sections, and is not representative of the tool overall. 
    This stage is a proof-of-concept. Many features are incomplete or buggy and the styling is inconsistent. 
</p>

<p>
    The intent for this project is to redesign and refine it 1-2 months from now and release it as a React application.
    I'm also considering creating a Chrome extension based off of it, so that the user can "launch" the Bindary from a pre-set keybind on any site, and use its functionality while the extension popup is open. 
</p>

<h2>How To Use</h2>

<p>
    Pressing one of the keys on the displayed list will perform the described task. 
    Items that contain "submenu" or describe multiple things will open a submenu. Pressing one of the listed keys in that submenu will open the associated link. For instance, pressing "h" will open the Utilities submenu, showing you new shortcuts. You can press "c" to open coolors.co in a new tab. If you wish to close a submenu, press the esc key. 
    Pressing "n" will let you create a brand new keybind of your own, allowing you to set a key to a link, or to an action. At this time, actions other than link and new timer key have been disabled for the public deployment version. 
</p>

<h2>Planned Features</h2>
<ul>
    <li>New Note action - allows the user to create a note that displays on the screen and is delete-able via a button; may also be editable and should be stored in cache</li>
    <li>Ability to create and customize your own submenus</li>
    <li>App options bound to 'o', opens the options menu allowing things like factory reset</li>
    <li>Ability to delete keybinds, using the 'del' key</li>
    <li>Store the keybind information in cache, so that each user "keeps" their own keybinds persistent through different sessions</li>
    <li>Ability to restore to the preset/default keybinds, like a "factory reset" option</li>
    <li>Arrow keys will allow the user to cycle between keybinds and notes and delete the selected item</li>
    <li>First visit popups showing the user how to use the tool</li>
    <li>Non-closable popup that displays on mobile devices informing user that this app is built for computers and will not function on their device</li>
    <li>"Haptic animations" - user interaction with the page performs visual cues. Eg., pressing a listed key flashes the associated list descriptor</li>
</ul>

<h2>Known Issues</h2>
    <ul>
        <li>The close buttons for popups do not work</li>
        <li>Giving the timer input non-number values will still create a timer instead of not allowing non-numbers (need to add live validation to this form)</li>
        <li>Giving the timer decimals will round the timer down to the nearest minute instead of handling for seconds</li>
        <li>Header navbar links do nothing right now + are not navigable by pressing the tab key</li>
        <li>The popups with forms aren't focusable/navigable via the tab key if the user unfocuses the popup after opening it, the user has to manually click back into one of the inputs</li>
        <li>Live form validation doesn't actually stop form submission when there's an invalid form input value right now</li>
        <li>Giving the link field a link without 'http://' or 'https://' and then opening that link will open to a null page, a protocol needs to be appended to the address internally if there isn't one</li>
        <li>Popup animations don't work currently, the code is there but the animations don't fire</li>
        <li>Popup styles haven't been updated to match the new global theme</li>
        <li>Page asks for notification permission on page load instead of when the user tries to set a timer for the first time (causes console warning)</li>
    </ul>
