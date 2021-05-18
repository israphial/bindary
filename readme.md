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
    I have plans to create more user-bindable actions and features, some of which are listed below, in the Planned Features section. There will likely be more actions in the Chrome extension version, as there's a lot that a user may want to do on any given page. 
</p>

<p>
    This release is a VERY early version! It is still actively being developed and improved. 
    Some features may be incomplete or buggy, and the code is inconsistent in many places. 
</p>

<p>
    The intent for this project is to redesign and refine it 1-2 months from now and release it as a React application.
    I'm also considering creating a Chrome extension based off of it, so that the user can "launch" the Bindary from a pre-set keybind on any site, and use its functionality while the extension popup is open. 
</p>

<h2>How To Use</h2>

<p>
    Pressing one of the keys on the displayed list will perform the described task. 
    Items that contain "submenu" or describe multiple things will open a submenu. Pressing one of the listed keys in that submenu will open the associated link. If you wish to close a submenu, press the esc key. 
    Pressing "n" will let you create a brand new keybind of your own, allowing you to set a key to a link, or to an action.
</p>

<h2>Planned Features</h2>
<ul>
    <li>Ability to create and customize your own submenus</li>
    <li>Ability to restore to the preset/default keybinds, in options menu</li>
    <li>Store the keybind information in cache, so that each user "keeps" their own keybinds persistent through different sessions</li>
    <li>New action type: Cascade. Cascade allows the user to tie more than one action to a single keybind, causing a "cascade" of actions</li>
    <li>Allow existing keybinds to be rebound to new keys (in options)</li>
    <li>First visit popups showing the user how to use the tool</li>
    <li>Popup that displays on mobile devices informing user that this app is built for computers and may not function properly on their device</li>
    <li>"Haptic animations" - user interaction with the page performs visual cues. Eg., pressing a listed key flashes the associated list descriptor</li>
    <li>Improved popup styles, especially submenu popup</li>
</ul>

<h2>Possibly Planned Features</h2>
<ul>
    <li>Multi-key keybinds. Eg. Pressing t and w at the same time can be a keybind that you assign like any other keybind. https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript</li>
    <li>If multi-keybinds end up being a feature, compare them against system key combinations (eg. ctrl+alt+del) to make sure users don't accidentally make keybinds that trigger non-browser actions</li>
    <li>New Action: Twitter Post. Open a Tweet modal (allowing you to post on Twitter). A popup opens, you type your desired tweet, and when submitted, query parameters are used to turn the message into a url (eg. https://twitter.com/intent/tweet?text=this%20is%20a%20test%20tweet), then that url opens to post the tweet.</li>
</ul>

<h2>Known Issues</h2>
    <ul>
        <li>Timer input doesn't actually stop input at maxlength</li>
        <li>Giving the timer decimals will round the timer down to the nearest minute instead of handling for seconds</li>
        <li>Header navbar links lead nowhere (placeholders)</li>
        <li>Some popup styles haven't been updated to match the new global theme</li>
        <li>Number row and numpad return the same key when they should return different keys (see https://keycode.info/ and keyCodes for numpad keys)</li>
        <li>Keybind "descriptions" are to be deprecated</li>
    </ul>
