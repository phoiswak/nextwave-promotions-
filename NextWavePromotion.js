// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Mobile dropdown toggle
const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".dropdown-toggle");
  toggle.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdown.classList.toggle("active");
    }
  });
});

// Close mobile menu when clicking a link (only on mobile)
const navLinks = document.querySelectorAll(".nav-menu a:not(.dropdown-toggle)");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Only close menu on mobile devices
    if (window.innerWidth <= 768) {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
  }
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply fade-in animation to cards
document
  .querySelectorAll(".service-card, .gallery-item, .cta-card, .service-item")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });

// Add active state to nav links based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => (link.style.color = ""));
      if (navLink && !navLink.classList.contains("cta-button")) {
        navLink.style.color = "#667eea";
      }
    }
  });
});

// const chatbot = document.getElementById("chatbot");
// const btn = document.getElementById("chatbot-button");
// const closeBtn = document.getElementById("chatbot-close");
// const messages = document.getElementById("chatbot-messages");
// const input = document.getElementById("chatbot-input");
// const send = document.getElementById("chatbot-send");
// const typing = document.getElementById("typing-indicator");
// let awaitingMenuConfirmation = false;
// let awaitingEmailDraft = false;
// let emailDraftStep = null;
// let emailData = {};

// btn.onclick = () => {
//   chatbot.style.display = "flex"; // show chatbot
//   messages.scrollTop = 0; // scroll to top
//   firstMessage(); // show first message
// };

// closeBtn.onclick = () => (chatbot.style.display = "none");

// send.onclick = sendMessage;
// input.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") sendMessage();
// });

// function addMessage(text, className) {
//   const div = document.createElement("div");
//   div.className = className;
//   div.innerHTML = text;
//   messages.appendChild(div);

//   // Only auto-scroll if near the bottom
//   const atBottom =
//     messages.scrollHeight - messages.scrollTop - messages.clientHeight < 50;

//   if (atBottom) {
//     messages.scrollTop = messages.scrollHeight;
//   }
// }

// // When opening the chatbot
// btn.onclick = () => {
//   chatbot.style.display = "flex";
//   messages.scrollTop = 0; // scroll to top
//   firstMessage();
// };

// function showTyping(callback) {
//   typing.style.display = "block";
//   setTimeout(() => {
//     typing.style.display = "none";
//     callback();
//   }, 1200);
// }

// function firstMessage() {
//   messages.innerHTML = "";
//   showTyping(() => {
//     addMessage(
//       `Hi 👋 I’m <strong>WaveBot</strong>, your virtual assistant at <strong>nextwave Promotions</strong>.<br><br>
//       I’m here to help with services, proposals, activations, careers, or support.<br>
//       How can I assist you today?`,
//       "bot"
//     );
//     showMainMenu();
//   });
// }

// function sendMessage() {
//   const rawText = input.value.trim();
//   const text = rawText.toLowerCase();
//   if (!text) return;

//   addMessage(rawText, "user");
//   input.value = "";

//   showTyping(() => {
//     if (awaitingEmailDraft) {
//       handleEmailDraft(rawText);
//     } else if (awaitingMenuConfirmation) {
//       handleMenuConfirmation(text);
//     } else {
//       respond(text);
//     }
//   });
// }

// function handleMenuConfirmation(text) {
//   if (text === "yes" || text === "y") {
//     awaitingMenuConfirmation = false;
//     showMainMenu();
//   } else if (text === "no" || text === "n") {
//     awaitingMenuConfirmation = false;
//     addMessage(`Alright 😊 You can type your question anytime.`, "bot");
//   } else {
//     addMessage(
//       `Please reply with <strong>Yes</strong> or <strong>No</strong>.`,
//       "bot"
//     );
//   }
// }

// function showMainMenu() {
//   addMessage(
//     `Please choose an option below 👇<br><br>
//     1️ Our Services & Brand Activations<br>
//     2️ Request a Proposal / Campaign Planning<br>
//     3️ Branding & Printing Services<br>
//     4️ Careers / Promoter Opportunities<br>
//     5️ Payments & Finance Queries<br>
//     6️ Technical or Website Support<br>
//     7️ Contact & General Enquiries`,
//     "bot"
//   );
// }

// function askReturnToMenu() {
//   awaitingMenuConfirmation = true;
//   addMessage(
//     `Would you like to return to the main menu?<br>
//      👉 Type <strong>Yes</strong> or <strong>No</strong>`,
//     "bot"
//   );
// }

// function handleEmailDraft(text) {
//   if (!emailDraftStep) {
//     emailDraftStep = "name";
//     addMessage("Great 😊 What is your full name?", "bot");
//     return;
//   }

//   if (emailDraftStep === "name") {
//     emailData.name = text;
//     emailDraftStep = "company";
//     addMessage("Company name?", "bot");
//   } else if (emailDraftStep === "company") {
//     emailData.company = text;
//     emailDraftStep = "email";
//     addMessage("Your email address?", "bot");
//   } else if (emailDraftStep === "email") {
//     emailData.email = text;
//     emailDraftStep = "message";
//     addMessage("Please type your message.", "bot");
//   } else if (emailDraftStep === "message") {
//     addMessage(
//       `✅ Your email is ready:<br><br>
//       <strong>Name:</strong> ${emailData.name}<br>
//       <strong>Company:</strong> ${emailData.company}<br>
//       <strong>Email:</strong> ${emailData.email}<br><br>
//       <strong>Message:</strong><br>${text}<br><br>
//       Please send this to <strong>sales@nextwavepromotions.co.za</strong>.
//       Our team will respond shortly.`,
//       "bot"
//     );

//     awaitingEmailDraft = false;
//     emailDraftStep = null;
//     emailData = {};
//     askReturnToMenu();
//   }
// }

// function respond(text) {
//   if (text.includes("1") || text.includes("service")) {
//     addMessage(
//       `We are a full-service brand activation agency offering:<br>
//         • Brand activations & field marketing<br>
//         • In-store promotions<br>
//         • Influencer & content campaigns<br><br>
//         For full service details, visit our <a href="brand-activations.html" target="_blank">Brand & Activation page</a> or our <a href="https://www.nextwavepromotions.co.za" target="_blank">main website</a>.`,
//       "bot"
//     );

//     askReturnToMenu();
//   } else if (
//     text.includes("2") ||
//     text.includes("proposal") ||
//     text.includes("quote")
//   ) {
//     addMessage(
//       `We’d love to assist with a custom campaign proposal.<br><br>
//     Please email <strong>sales@nextwavepromotions.co.za</strong> with:
//     <ul>
//       <li>Company name</li>
//       <li>Campaign objective</li>
//       <li>Target audience</li>
//       <li>Location(s)</li>
//       <li>Estimated budget</li>
//       <li>Preferred dates</li>
//     </ul>
//     👉 Would you like me to help you write the email? (Yes / No)`,
//       "bot"
//     );
//     awaitingEmailDraft = true;
//   } else if (text.includes("3") || text.includes("print")) {
//     addMessage(
//       `We offer branding & printing services such as:<br>
//     • T-shirts & uniforms<br>
//     • Flyers & banners<br>
//     • Activation materials<br><br>
//     Email: sales@nextwavepromotions.co.za`,
//       "bot"
//     );
//     askReturnToMenu();
//   } else if (text.includes("4") || text.includes("job")) {
//     addMessage(
//       `To apply as a promoter, email <strong>info@nextwavepromotions.co.za</strong> with:<br>
//     • CV<br>
//     • Photos<br>
//     • Location`,
//       "bot"
//     );
//     askReturnToMenu();
//   } else if (text.includes("5") || text.includes("payment")) {
//     addMessage(
//       `For invoices or payments, email <strong>sales@nextwavepromotions.co.za</strong> with your invoice number.`,
//       "bot"
//     );
//     askReturnToMenu();
//   } else if (text.includes("6") || text.includes("website")) {
//     addMessage(
//       `For technical support, email <strong>support@nextwavepromotions.co.za</strong> with screenshots if possible.`,
//       "bot"
//     );
//     askReturnToMenu();
//   } else if (text.includes("7") || text.includes("contact")) {
//     addMessage(
//       `📧 info@nextwavepromotions.co.za<br>
//     📞 078 389 4384<br>
//     📍 Johannesburg – Spaces Rivonia`,
//       "bot"
//     );
//     askReturnToMenu();
//   } else {
//     addMessage(
//       `🤔 I didn’t quite understand that.</br>
//         please select option (1-7)`,
//       "bot"
//     );
//   }
// }

// window.addEventListener("load", () => {
//   const tooltip = document.getElementById("chatbot-tooltip");

//   // Show tooltip on page load
//   setTimeout(() => {
//     tooltip.style.opacity = "1";
//     tooltip.style.transform = "translateY(0)";
//   }, 800);
// });

const chatbot = document.getElementById("chatbot");
const btn = document.getElementById("chatbot-button");
const closeBtn = document.getElementById("chatbot-close");
const messages = document.getElementById("chatbot-messages");
const input = document.getElementById("chatbot-input");
const send = document.getElementById("chatbot-send");
const typing = document.getElementById("typing-indicator");

let awaitingProposalChannel = false;
let awaitingMenuConfirmation = false;
let awaitingProposalConfirmation = false;
let awaitingEmailDraft = false;
let emailDraftStep = null;
let emailData = {};

// Open chatbot
btn.onclick = () => {
  chatbot.style.display = "flex";
  messages.scrollTop = 0;
  firstMessage();
};

closeBtn.onclick = () => (chatbot.style.display = "none");

send.onclick = sendMessage;
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function addMessage(text, className) {
  const div = document.createElement("div");
  div.className = className;
  div.innerHTML = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping(callback) {
  typing.style.display = "block";
  setTimeout(() => {
    typing.style.display = "none";
    callback();
  }, 1000);
}

function firstMessage() {
  messages.innerHTML = "";
  showTyping(() => {
    addMessage(
      `Hi 👋 I’m <strong>WaveBot</strong>, your virtual assistant at <strong>NextWave Promotions</strong>.<br><br>
      How can I assist you today?`,
      "bot"
    );
    showMainMenu();
  });
}

function showMainMenu() {
  addMessage(
    `<strong>Please choose an option:</strong><br><br>
  1. Our Services & Brand Activations<br><br>
  2. Request a Proposal / Campaign Planning<br><br>
  3. Branding & Printing Services<br><br>
  4. Careers / Promoter Opportunities<br><br>
  5. Payments & Finance Queries<br><br>
  6. Technical or Website Support<br><br>
  7. Contact & General Enquiries`,
  "bot"
  );
}

function sendMessage() {
  const rawText = input.value.trim();
  const text = rawText.toLowerCase();
  if (!rawText) return;

  addMessage(rawText, "user");
  input.value = "";

  showTyping(() => {
    if (awaitingEmailDraft) {
      handleEmailDraft(rawText);
    } else if (awaitingProposalConfirmation) {
      handleProposalConfirmation(text);
    } else if (awaitingMenuConfirmation) {
      handleMenuConfirmation(text);
    } else {
      respond(text);
    }
  });
}

// ===== MENU CONFIRMATION =====
function handleMenuConfirmation(text) {
  if (text === "yes" || text === "y") {
    awaitingMenuConfirmation = false;
    showMainMenu();
  } else if (text === "no" || text === "n") {
    awaitingMenuConfirmation = false;
    addMessage("Alright 😊 You can ask another question anytime.", "bot");
  } else {
    addMessage("Please reply with Yes or No.", "bot");
  }
}

function askReturnToMenu() {
  awaitingMenuConfirmation = true;
  addMessage(
    `Would you like to return to the main menu?<br>
    👉 Type <strong>Yes</strong> or <strong>No</strong>`,
    "bot"
  );
}

// ===== PROPOSAL YES / NO =====
function handleProposalConfirmation(text) {
  if (text === "yes" || text === "y") {
    awaitingProposalConfirmation = false;
    awaitingEmailDraft = true;
    emailDraftStep = null;
    addMessage("Great 😊 Let’s get started.", "bot");
    handleEmailDraft();
  } else if (text === "no" || text === "n") {
    awaitingProposalConfirmation = false;
    showMainMenu();
  } else {
    addMessage("Please reply with Yes or No.", "bot");
  }
}

// ===== EMAIL DRAFT FLOW =====
function handleEmailDraft(text) {
  if (!emailDraftStep) {
    emailDraftStep = "name";
    addMessage("What is your full name?", "bot");
    return;
  }

  if (emailDraftStep === "name") {
    emailData.name = text;
    emailDraftStep = "company";
    addMessage("Company name?", "bot");
  } else if (emailDraftStep === "company") {
    emailData.company = text;
    emailDraftStep = "email";
    addMessage("Your email address?", "bot");
  } else if (emailDraftStep === "email") {
    emailData.email = text;
    emailDraftStep = "message";
    addMessage("Please type your message.", "bot");
  } else if (emailDraftStep === "message") {
    addMessage(
      `✅ <strong>Your email is ready:</strong><br><br>
      <strong>Name:</strong> ${emailData.name}<br>
      <strong>Company:</strong> ${emailData.company}<br>
      <strong>Email:</strong> ${emailData.email}<br><br>
      <strong>Message:</strong><br>${text}<br><br>
      Please send this to <strong>sales@nextwavepromotions.co.za</strong>.`,
      "bot"
    );

    awaitingEmailDraft = false;
    emailDraftStep = null;
    emailData = {};
    askReturnToMenu();
  }
}

// ===== MAIN RESPONSES =====
function respond(text) {
  if (text === "1") {
    addMessage(
      `We offer:<br>
      • Brand activations<br>
      • In-store promotions<br>
      • Influencer campaigns`,
      "bot"
    );
    askReturnToMenu();
  } else if (text === "2") {
    addMessage(
      `We’d love to assist with a custom proposal.<br><br>
      👉 Would you like me to help you write the email? (Yes / No)`,
      "bot"
    );
    awaitingProposalConfirmation = true;
  } else if (text === "3") {
    addMessage(
      `We offer branding & printing services.<br>
      Email: sales@nextwavepromotions.co.za`,
      "bot"
    );
    askReturnToMenu();
  } else if (text === "4") {
    addMessage(
      `Apply by emailing:<br>
      <strong>info@nextwavepromotions.co.za</strong>`,
      "bot"
    );
    askReturnToMenu();
  } else if (text === "5") {
    addMessage(
      `For payments, email:<br>
      <strong>sales@nextwavepromotions.co.za</strong>`,
      "bot"
    );
    askReturnToMenu();
  } else if (text === "6") {
    addMessage(
      `Technical support:<br>
      <strong>support@nextwavepromotions.co.za</strong>`,
      "bot"
    );
    askReturnToMenu();
  } else if (text === "7") {
    addMessage(
      `📧 info@nextwavepromotions.co.za<br>
      📞 078 389 4384`,
      "bot"
    );
    askReturnToMenu();
  } else {
    addMessage(
      `🤔 I didn’t understand that.<br>
      Please choose an option (1–7).`,
      "bot"
    );
  }
}
