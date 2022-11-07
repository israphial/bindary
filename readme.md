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
    THANK YOU for stopping by! If you have any suggestions or comments regarding this project, feel free to make a new issue <a href="https://github.com/israphial/bindary/issues">HERE.</a>
    <a style="display: block; color: #23874b;" href="https://israphial.github.io/bindary/">Click here to try the Bindary out!</a>
    The Bindary allows the user to navigate around the internet using only their keyboard. When the page first loads, several keybinds are set and are displayed with descriptions. Pressing a listed key performs its associated action. At the moment, the available actions are:
    <ul>
        <li>Open Link</li>
        <li>Make New Keybind</li>
        <li>Bind New Timer Key</li>
    </ul>
</p>

<h2>Known Issues</h2>
    <ul>
        <li>Keypresses don't always work at "base state". Cause is unclear. Pressing esc or clicking on window fixes it</li>
        <li>Timer input doesn't stop input at maxlength</li>
        <li>Giving the timer decimals will round the timer down to the nearest minute instead of handling for seconds</li>
        <li>Header navbar links lead nowhere (placeholders)</li>
        <li>Some popup styles haven't been updated to match the new global theme</li>
        <li>Number row and numpad return the same key when they should return different keys (see https://keycode.info/ and keyCodes for numpad keys)</li>
        <li>Keybind "descriptions" are to be deprecated</li>
        <li>Vertical styling for timer container needs to be adjusted to line up properly with existing content</li>
        <li>timer container should not push keybinds displays over, should be removed from element flow</li>
        <li>(internal) .bind(this) is overused in Timer class, need to do an optimization and organization pass to improve the code</li>
    </ul>
