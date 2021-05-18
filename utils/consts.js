export const presetHotkeysArray = [
  {
    title: "New keybind",
    keyBind: "n",
    description: "Add new keybind",
    action: {
      type: "New keybind",
      body: "",
    },
    protected: true,
  },
  {
    title: "New timer",
    keyBind: "t",
    description: "Add new timer",
    action: {
      type: "timer",
      body: "",
    },
    protected: true,
  },
  {
    title: "Delete a keybind",
    keyBind: "d",
    description: "Delete a keybind",
    action: {
      type: "delete",
      body: "",
    },
    protected: true,
  },
  {
    title: "App options",
    keyBind: "o",
    description: "App options",
    action: {
      type: "options",
      body: "",
    },
    protected: true,
  },
  {
    title: "Social media menu",
    keyBind: "f",
    description: "Social media submenu",
    subHotkeys: [
      {
        title: "Facebook",
        keyBind: "f",
        description: "Facebook",
        link: "https://www.facebook.com",
      },
      {
        title: "FB messenger",
        keyBind: "m",
        description: "FB messenger",
        link: "https://www.facebook.com/messages/t/100000705135107/",
      },
      {
        title: "Instagram",
        keyBind: "i",
        description: "Instagram",
        link: "https://www.instagram.com/",
      },
      {
        title: "Twitter",
        keyBind: "t",
        description: "Twitter",
        link: "https://www.twitter.com",
      },
      {
        title: "Reddit",
        keyBind: "r",
        description: "Reddit",
        link: "https://www.reddit.com",
      },
    ],
  },
  {
    title: "Google",
    keyBind: "g",
    description: "Google",
    link: "https://google.com",
  },
  {
    title: "Evernote",
    keyBind: "e",
    description: "Evernote",
    link: "https://www.evernote.com/Login.action",
  },
  {
    title: "Entertainment menu",
    keyBind: "y",
    description: "Entertainment submenu",
    subHotkeys: [
      {
        title: "Youtube",
        keyBind: "y",
        description: "Youtube homepage",
        link: "https://www.youtube.com/",
      },
      {
        title: "Youtube subscriptions",
        keyBind: "s",
        description: "Youtube subscriptions",
        link: "https://www.youtube.com/feed/subscriptions",
      },
      {
        title: "Twitch",
        keyBind: "t",
        description: "Twitch homepage",
        link: "https://www.twitch.tv/",
      },
      {
        title: "Netflix",
        keyBind: "n",
        description: "Netflix",
        link: "https://www.netflix.com",
      },
      {
        title: "Hulu",
        keyBind: "h",
        description: "Hulu",
        link: "https://www.hulu.com",
      },
      {
        title: "Disney+",
        keyBind: "d",
        description: "Disney+",
        link: "https://www.disneyplus.com",
      },
    ],
  },
  {
    title: "Music menu",
    keyBind: "m",
    description: "Music submenu",
    subHotkeys: [
      {
        title: "Spotify",
        keyBind: "s",
        description: "Spotify",
        link: "https://www.spotify.com",
      },
      {
        title: "Soundcloud",
        keyBind: "s",
        description: "Soundcloud",
        link: "https://www.soundcloud.com",
      },
    ],
  },
  {
    title: "Code menu",
    keyBind: "c",
    description: "Code submenu",
    subHotkeys: [
      {
        title: "Github",
        keyBind: "g",
        description: "Github",
        link: "https://www.github.com/",
      },
      {
        title: "Pastebin",
        keyBind: "p",
        description: "Pastebin",
        link: "https://pastebin.com",
      },
      {
        title: "JSFiddle",
        keyBind: "j",
        description: "JSFiddle",
        link: "https://jsfiddle.net/",
      },
      {
        title: "MDN",
        keyBind: "m",
        description: "MDN web docs",
        link: "https://developer.mozilla.org/en-US/",
      },
      {
        title: "Reactdocs",
        keyBind: "r",
        description: "React docs",
        link: "https://developer.mozilla.org/en-US/",
      },
      {
        title: "Angular docs",
        keyBind: "a",
        description: "Angular docs",
        link: "https://angular.io/docs",
      },
      {
        title: "Bootstrap 5.0 docs",
        keyBind: "b",
        description: "Bootstrap 5.0 Docs",
        link: "https://getbootstrap.com/docs/5.0/getting-started/introduction/",
      },
    ],
  },
  {
    title: "Coding Blogs/Resources",
    keyBind: "b",
    description: "Coding blogs/resources",
    subHotkeys: [
      {
        title: "Hackernoon Webdev",
        keyBind: "j",
        description: "Hackernoon webdev",
        link: "https://hackernoon.com/tagged/web-development",
      },
      {
        title: "Dev.to",
        keyBind: "d",
        description: "Dev.to",
        link: "https://dev.to/",
      },
      {
        title: "Codenewbie",
        keyBind: "c",
        description: "Codenewbie",
        link: "https://www.codenewbie.org/",
      },
      {
        title: "SamanthaMing blog",
        keyBind: "s",
        description: "SamanthaMing blog",
        link: "https://www.samanthaming.com/blog/",
      },
    ],
  },
  {
    title: "Utilities Menu",
    keyBind: "u",
    description: "Utilities submenu",
    subHotkeys: [
      {
        title: "Coolors.co app",
        keyBind: "c",
        description: "Coolors.co app",
        link: "https://coolors.co/generate",
      },
      {
        title: "HEX picker",
        keyBind: "h",
        description: "Detailed HEX picker and contraster",
        link: "https://htmlcolorcodes.com/color-picker/",
      },
      {
        title: "W3C Markup Validator",
        keyBind: "w",
        description: "W3C markup validator",
        link: "https://validator.w3.org/",
      },
      {
        title: "Unsplash",
        keyBind: "u",
        description: "Unsplash",
        link: "https://unsplash.com/",
      },
    ],
  },
];

export const newKeybindPopup = document.querySelector(
  ".popup_type_add-keybind"
);

export const newTimerPopup = document.querySelector(".popup_type_add-timer");

export const deleteKeybindPopup = document.querySelector(".popup_type_delete");

export const optionsPopup = document.querySelector(".popup_type_options");
