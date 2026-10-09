const answers_no = {
  english: [
    "No",
    "Are you so so sure?",
    "stop being mean?",
    "YES?",
    "Y."
  ],
  acoustic: [
    "No",
    "No",
    "Yes"
  ]
};

const answers_yes = {
  english: "Yes",
  acoustic: "Yes"
};

let language = "english";

const no_button = document.getElementById("no-button");
const yes_button = document.getElementById("yes-button");
const question_heading = document.getElementById("question-heading");

let index = 0;
let size = 50;
let clicks = 0;

no_button.addEventListener("click", () => {
  const list = answers_no[language] || answers_no.english;
  const lastIndex = list.length - 1;

  const banner = document.getElementById("banner");
  if (clicks === 0) {
    banner.src = "public/images/no.gif";
    refreshBanner();
  }
  clicks++;

  if (language === "acoustic") {
    if (clicks === 1) {
      // 1st No click: "Tf u mean no try again", buttons stay Yes | No
      question_heading.textContent = "Tf u mean no try again";
      yes_button.textContent = "Yes";
      no_button.textContent = "No";
    } else if (clicks >= 2) {
      // 2nd No click: "why we pretending you have a choice ", both buttons become Yes | Yes
      question_heading.textContent = "why we pretending you have a choice ";
      yes_button.textContent = "Yes";
      no_button.textContent = "Yes";
    }
  } else {
    no_button.textContent = list[index];
  }

  size += 40;
  yes_button.style.height = `${size}px`;
  yes_button.style.width = `${size}px`;

  index++;

  // Trigger success screen when clicking No on 3rd attempt or when reaching end of array
  if (index >= lastIndex) {
    yes_button.click();
    return;
  }
});

yes_button.addEventListener("click", () => {
  const banner = document.getElementById("banner");
  banner.src = "public/images/yes.gif";
  refreshBanner();

  document.getElementsByClassName("buttons")[0].style.display = "none";
  document.getElementsByClassName("message")[0].style.display = "block";
});

function refreshBanner() {
  const banner = document.getElementById("banner");
  const src = banner.src;
  banner.src = "";
  banner.src = src;
}

function changeLanguage() {
  const select = document.getElementById("language-select");
  language = select.value;

  if (!answers_no[language]) language = "english";

  question_heading.textContent = "Will you be my valentine Fifi?";

  if (language === "acoustic") {
    document.getElementById("success-message").textContent = "I knew it! ❤️ :3";
  } else {
    document.getElementById("success-message").textContent = "Yipppie,enjoy wednesday  :3";
  }

  index = 0;
  clicks = 0;
  size = 50;

  yes_button.style.height = "50px";
  yes_button.style.width = "50px";
  yes_button.textContent = answers_yes[language];
  no_button.textContent = answers_no[language][0];

  const banner = document.getElementById("banner");
  banner.src = "./public/images/maina.jpeg";
  refreshBanner();
}
