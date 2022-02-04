"use strict";

const backgroundButtons = document.querySelectorAll("#bg-button");
let btnSelected, sectionContent;

var dict = {
  0: "education",
  1: "research",
  2: "experience",
};

for (let i = 0; i < backgroundButtons.length; i++) {
  //   document.getElementById(dict[i]).style.display = "none";

  backgroundButtons[i].addEventListener("click", function () {
    btnSelected = !backgroundButtons[i].classList.contains("bg-emerald-800");
    sectionContent = document.getElementById(dict[i]);

    sectionContent.classList.toggle("hidden");

    backgroundButtons[i].classList.toggle("bg-emerald-800");
    backgroundButtons[i].classList.toggle("text-white");
  });
}

const button = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");
const border = document.querySelector("#menu-border");
button.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});
