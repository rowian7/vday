const answers_no = {
  english: [
    "No",
    "Are you so so sure?",
    "stop being mean?",
    "YES?",
    "Y."
  ],
  dari: [
    "نه؟",
    "چرا نه؟",
    "مرا دوست نداری؟",
    "بله",
    "بله"
  ]
};

const answers_yes = {
  english: "Yes",
  dari: "بله"
};

let language = "english";

const no_button = document.getElementById("no-button");
const yes_button = document.getElementById("yes-button");

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

  size += 40;
  yes_button.style.height = `${size}px`;
  yes_button.style.width = `${size}px`;

  index++;

  if (index >= lastIndex) {
    yes_button.click();
    return;
  }

  no_button.textContent = list[index];
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

  // Question ALWAYS stays in English
  document.getElementById("question-heading").textContent =
    "Will you be my valentine?";

  // Success message
  document.getElementById("success-message").textContent =
    language === "dari"
      ? "خیر ببینی جیگر"
      : "Yipppie,enjoy your giftsssssss  :3";

  // Reset state
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