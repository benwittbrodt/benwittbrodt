"use strict";

const backgroundButtons = document.querySelectorAll(".background-button");
let btnSelected, sectionContent;

var dict = {
  0: "education",
  1: "research",
  2: "experience",
};

for (let i = 0; i < backgroundButtons.length; i++) {
  //   document.getElementById(dict[i]).style.display = "none";

  backgroundButtons[i].addEventListener("click", function () {
    btnSelected = !backgroundButtons[i].classList.contains("selected");
    sectionContent = document.getElementById(dict[i]);

    sectionContent.classList.toggle("bg-hidden");

    backgroundButtons[i].classList.toggle("selected");
  });
}
