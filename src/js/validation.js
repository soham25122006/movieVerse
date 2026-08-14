/**
 * Movie Explorer - Form Validation Module
 * JavaScript input validation with clean error states and toast notifications.
 */
import { WatchlistService } from "./watchlist";
import { ProfileService } from "./profile";
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name");
    const email = document.getElementById("contact-email");
    const subject = document.getElementById("contact-subject");
    const message = document.getElementById("contact-message");

    let isValid = true;

    // Reset error messages
    clearFormErrors();

    if (!name || name.value.trim().length < 2) {
      showFieldError("contact-name", "Please enter your full name (at least 2 characters).");
      isValid = false;
    }

    if (!email || !validateEmail(email.value.trim())) {
      showFieldError("contact-email", "Please enter a valid email address.");
      isValid = false;
    }

    if (!subject || subject.value.trim().length < 3) {
      showFieldError("contact-subject", "Please enter a subject line.");
      isValid = false;
    }

    if (!message || message.value.trim().length < 10) {
      showFieldError("contact-message", "Message must be at least 10 characters long.");
      isValid = false;
    }

    if (isValid) {
      // Show success feedback
      if (WatchlistService && WatchlistService.showToast) {
        WatchlistService.showToast(`Thank you, ${name.value.trim()}! Your message has been sent successfully.`, "success");
      }
      form.reset();
    }
  });
}

function initLoginForm() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById("login-username");
    const passwordInput = document.getElementById("login-password");

    clearFormErrors();

    let isValid = true;
    if (!usernameInput || usernameInput.value.trim().length < 3) {
      showFieldError("login-username", "Username or Email must be at least 3 characters.");
      isValid = false;
    }

    if (!passwordInput || passwordInput.value.trim().length < 6) {
      showFieldError("login-password", "Password must be at least 6 characters.");
      isValid = false;
    }

    if (isValid) {
      const username = usernameInput.value.trim();
      const userProfile = {
        name: username.includes("@") ? username.split("@")[0] : username,
        email: username.includes("@") ? username : `${username.toLowerCase()}@movieexplorer.com`,
      };

      if (ProfileService) {
        ProfileService.saveUserProfile(userProfile);
      }

      if (WatchlistService && WatchlistService.showToast) {
        WatchlistService.showToast("Login Successful! Redirecting...", "success");
      }

      setTimeout(() => {
        window.location.href = "profile.html";
      }, 1200);
    }
  });
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showFieldError(fieldId, errorMsg) {
  const inputEl = document.getElementById(fieldId);
  if (!inputEl) return;

  inputEl.classList.add("border-red-500", "focus:ring-red-500");

  let errorEl = inputEl.parentNode.querySelector(".field-error-msg");
  if (!errorEl) {
    errorEl = document.createElement("p");
    errorEl.className = "field-error-msg text-red-400 text-xs mt-1 font-medium animate-fade-in";
    inputEl.parentNode.appendChild(errorEl);
  }
  errorEl.textContent = errorMsg;
}

function clearFormErrors() {
  document.querySelectorAll(".field-error-msg").forEach(el => el.remove());
  document.querySelectorAll("input, textarea").forEach(el => {
    el.classList.remove("border-red-500", "focus:ring-red-500");
  });
}

export const ValidationService = {
  initContactForm,
  initLoginForm,
  validateEmail
};
