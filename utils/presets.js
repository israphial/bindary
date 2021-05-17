export const presetHotkeysArray = [
  {
    title: "google Search",
    keyBind: "s",
    description: "Google search",
    action: {
      type: "Javascript event",
      body:
        "const searchInput = prompt('Enter your search and press enter');window.open(`http://www.google.com/search?q=${searchInput}`)",
    },
  },
  {
    title: "New Keybind",
    keyBind: "n",
    description: "Add new keybind",
    action: {
      type: "New keybind",
      body: "",
    },
  },
  {
    title: "New Timer",
    keyBind: "t",
    description: "Add new timer",
    action: {
      type: "timer",
      body: "",
    },
  },

  {
    title: "Social Media Menu",
    keyBind: "f",
    description: "Social Media submenu",
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
        description: "Messenger",
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
      {
        title: "Old.Reddit",
        keyBind: "o",
        description: "Old.Reddit",
        link: "https://www.old.reddit.com",
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
    title: "Entertainment Menu",
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
        title: "Youtube Subscriptions",
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
    title: "Music Menu",
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
    title: "Code Menu",
    keyBind: "c",
    description: "Code submenu",
    subHotkeys: [
      {
        title: "Practicum",
        keyBind: "p",
        description: "Practicum homepage",
        link: "https://practicum.yandex.com/profile/web/",
      },
      {
        title: "Practicum student resources",
        keyBind: "s",
        description: "Practicum student resources",
        link:
          "https://www.notion.so/Practicum-by-Yandex-Student-Guide-2919ba4a88004c0ea7884873d4dc21bf",
      },
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
        description: "MDN Web Docs",
        link: "https://developer.mozilla.org/en-US/",
      },
      {
        title: "Reactdocs",
        keyBind: "r",
        description: "React Documentation",
        link: "https://developer.mozilla.org/en-US/",
      },
      {
        title: "Angular Docs",
        keyBind: "a",
        description: "Angular Docs",
        link: "https://angular.io/docs",
      },
      {
        title: "JSFiddle",
        keyBind: "j",
        description: "JSFiddle",
        link: "https://jsfiddle.net/",
      },
      {
        title: "Bootstrap 5.0 Docs",
        keyBind: "b",
        description: "Bootstrap 5.0 Docs",
        link: "https://getbootstrap.com/docs/5.0/getting-started/introduction/",
      },
    ],
  },
  {
    title: "Coding Blogs/Resources",
    keyBind: "b",
    description: "Coding Blogs/Resources",
    subHotkeys: [
      {
        title: "Hackernoon Webdev",
        keyBind: "j",
        description: "Hackernoon Webdev",
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
        title: "SamanthaMing Blog",
        keyBind: "s",
        description: "SamanthaMing Blog",
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
        title: "Pomodoro timer",
        keyBind: "t",
        description: "Tomato-timer homepage",
        link: "https://tomato-timer.com/",
      },
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
        description: "W3C Markup validator",
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
