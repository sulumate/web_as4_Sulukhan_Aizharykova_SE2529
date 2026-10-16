/* Shared form behaviour for the five assignment pages. */
(() => {
  "use strict";

  document.querySelectorAll("[data-demo-form]").forEach((form) => {
    const usesBootstrap = form.dataset.validation === "bootstrap";
    const status = document.getElementById("form-status");
    const password = form.querySelector("#password");
    const confirmation = form.querySelector("#confirm-password");
    const toggles = form.querySelectorAll("[data-toggle-password]");
    const touched = new Set();

    // Optional radios and hobby checkboxes do not need validation styling.
    const fields = Array.from(form.querySelectorAll("input, select, textarea"))
      .filter((field) => {
        const hasConstraint = ["required", "minlength", "maxlength", "pattern",
          "min", "max"].some((attribute) => field.hasAttribute(attribute));
        const hasFormat = ["email", "url", "number"].includes(field.type);
        return field.willValidate && !["radio", "checkbox"].includes(field.type)
          && (hasConstraint || hasFormat);
      });

    function hideStatus() {
      if (status) status.hidden = true;
    }

    function showSuccess() {
      if (!status) return;
      status.textContent = "Form completed successfully. This is a practice form; no data was sent.";
      status.hidden = false;
    }

    // Always replace the previous error, including after either password changes.
    function updatePasswordMatch() {
      if (!password || !confirmation) return;
      const mismatch = confirmation.value !== ""
        && confirmation.value !== password.value;
      confirmation.setCustomValidity(mismatch ? "Passwords must match." : "");
    }

    function errorMessage(field) {
      const validity = field.validity;
      if (validity.valueMissing) {
        return field.tagName === "SELECT"
          ? "Please select an option."
          : "This field is required.";
      }
      if (validity.typeMismatch) {
        return field.type === "email"
          ? "Enter a valid email address."
          : "Enter a valid URL.";
      }
      if (validity.tooShort) return `Use at least ${field.minLength} characters.`;
      if (validity.tooLong) return `Use no more than ${field.maxLength} characters.`;
      if (validity.patternMismatch) return "Please match the requested format.";
      if (validity.rangeUnderflow) return `Enter a value of at least ${field.min}.`;
      if (validity.rangeOverflow) return `Enter a value no greater than ${field.max}.`;
      if (validity.badInput) return "Enter a valid number.";
      if (validity.stepMismatch) return "Enter a value that matches the allowed step.";
      return field.validationMessage || "Please check this field.";
    }

    function setErrorDescription(field, invalid) {
      if (!usesBootstrap) return;
      const errorId = `${field.id}-feedback`;
      // Keep helper text; expose an error to screen readers only while invalid.
      const descriptions = (field.getAttribute("aria-describedby") || "")
        .split(/\s+/).filter((id) => id && id !== errorId);
      if (invalid && document.getElementById(errorId)) descriptions.push(errorId);
      if (descriptions.length) field.setAttribute("aria-describedby", descriptions.join(" "));
      else field.removeAttribute("aria-describedby");
    }

    fields.forEach((field) => setErrorDescription(field, false));

    function clearFieldState(field) {
      field.classList.remove("is-valid", "is-invalid");
      field.removeAttribute("aria-invalid");
      setErrorDescription(field, false);
    }

    function renderField(field) {
      // An empty optional field should stay neutral.
      if (!field.required && field.value === "") {
        clearFieldState(field);
        return;
      }

      const valid = field.validity.valid;
      field.classList.toggle("is-valid", valid);
      field.classList.toggle("is-invalid", !valid);
      if (valid) field.removeAttribute("aria-invalid");
      else field.setAttribute("aria-invalid", "true");

      const feedback = document.getElementById(`${field.id}-feedback`);
      if (!valid && feedback) feedback.textContent = errorMessage(field);
      setErrorDescription(field, !valid);
    }

    function handleEdit(event) {
      hideStatus();
      if (!usesBootstrap) return;

      const field = event.target;
      if (field === password || field === confirmation) updatePasswordMatch();
      if (touched.has(field)) renderField(field);

      // Changing the first password can invalidate an already checked repeat.
      if (field === password && confirmation && touched.has(confirmation)) {
        renderField(confirmation);
      }
    }

    form.addEventListener("input", handleEdit);
    form.addEventListener("change", handleEdit);

    form.addEventListener("focusout", (event) => {
      if (!usesBootstrap || !fields.includes(event.target)) return;
      touched.add(event.target);
      updatePasswordMatch();
      renderField(event.target);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // For HTML-only pages the browser checks constraints before submit fires.
      if (!usesBootstrap) {
        showSuccess();
        return;
      }

      updatePasswordMatch();
      const valid = form.checkValidity();
      fields.forEach((field) => {
        touched.add(field);
        renderField(field);
      });

      if (!valid) {
        hideStatus();
        const firstInvalid = fields.find((field) => !field.validity.valid);
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      showSuccess();
    });

    function setPasswordVisibility(button, visible) {
      const input = document.getElementById(button.dataset.togglePassword);
      if (!input || !form.contains(input)) return;
      input.type = visible ? "text" : "password";
      button.textContent = visible ? "Hide" : "Show";
      button.setAttribute("aria-pressed", String(visible));
      button.setAttribute("aria-label", visible ? "Hide password" : "Show password");
    }

    toggles.forEach((button) => {
      button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.togglePassword);
        if (input) setPasswordVisibility(button, input.type === "password");
      });
    });

    form.addEventListener("reset", () => {
      // Wait until the browser has restored the fields' default values.
      window.setTimeout(() => {
        touched.clear();
        fields.forEach((field) => {
          clearFieldState(field);
          field.setCustomValidity("");
        });
        toggles.forEach((button) => setPasswordVisibility(button, false));
        hideStatus();
      }, 0);
    });
  });
})();
