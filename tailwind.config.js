const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.php",
    "./template-parts/**/*.php",
    "./*.php",
    "./inc/**/*.php",
    "./inc/*.php",
    "./src/**/*.js",
  ],
  darkMode: false, //you can set it to media(uses prefers-color-scheme) or class(better for toggling modes via a button)
  theme: {
    extend: {},
    colors: {
      "main-purple": "#150E33",
      "icon-main": "#006C67",
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      violet: colors.violet,
      slate: colors.slate,
      cyan: colors.cyan,
      purple: colors.purple,
    },
  },
  variants: {},
  plugins: [],
};
