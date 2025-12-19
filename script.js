// Tabs
const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-content");

function opentab(tabname) {
  const evt = window.event;
  for (const tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (const tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  if (evt?.currentTarget) {
    evt.currentTarget.classList.add("active-link");
  }
  const target = document.getElementById(tabname);
  if (target) target.classList.add("active-tab");
}

// Navigation menu
const sidemenu = document.getElementById("sidemenu");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");

function openmenu() {
  if (!sidemenu) return;
  sidemenu.classList.add("open");
  if (menuBtn) menuBtn.setAttribute("aria-expanded", "true");
}

function closemenu() {
  if (!sidemenu) return;
  sidemenu.classList.remove("open");
  if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
}

if (closeBtn) closeBtn.addEventListener("click", closemenu);

// Contact form
const scriptURL =
  "https://script.google.com/macros/s/AKfycbzhqM-8NQnaePDlyIHXYUiXUvZO8FbfvHRzXZUETyjlnhPitcYIZOqJvUML0AC1jT4/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (msg) {
      msg.textContent = "Sending...";
    }
    try {
      const res = await fetch(scriptURL, {
        method: "POST",
        body: new FormData(form),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      if (msg) msg.textContent = "Message sent successfully!";
      setTimeout(() => {
        if (msg) msg.textContent = "";
      }, 5000);
      form.reset();
    } catch (error) {
      if (msg) msg.textContent = "Something went wrong. Please try again.";
      console.error("Error!", error.message);
    }
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
