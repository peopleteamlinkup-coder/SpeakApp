// Paste your deployed Google Apps Script Web App URL between the quotes below.
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyyRr82PxQkcqtZvzDE4rBpkuQNGwqou275kf05YdpRkAettD__J54H5SSRc3k5R-8/exec";

const form = document.getElementById("feedbackForm");
const messageInput = document.getElementById("message");
const characterCount = document.getElementById("characterCount");
const submitButton = document.getElementById("submitButton");
const statusMessage = document.getElementById("statusMessage");

messageInput.addEventListener("input", () => {
  characterCount.textContent = `${messageInput.value.length} / 2000`;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const feedbackType = form.elements.feedbackType.value;
  const message = messageInput.value.trim();

  if (!message) {
    showStatus("Please write a message before submitting.", "error");
    messageInput.focus();
    return;
  }

  if (GOOGLE_SCRIPT_URL.includes("PASTE_YOUR")) {
    showStatus("Setup needed: add your Google Apps Script URL in script.js.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  showStatus("", "");

  try {
    // text/plain avoids a browser CORS preflight and works well with Apps Script web apps.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        type: feedbackType,
        message
      })
    });

    form.reset();
    messageInput.value = "";
    characterCount.textContent = "0 / 2000";
    showStatus("Thank you. Your anonymous feedback has been sent.", "success");
  } catch (error) {
    console.error(error);
    showStatus("We could not send your feedback. Please try again.", "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send anonymously";
  }
});

function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`.trim();
}
