# Assignment 4: Forms and Validation

**Student:** Sulukhan Aizharykova  
**Group:** SE-2529

A static, browser-only project demonstrating HTML forms, built-in HTML5 validation, Bootstrap form layouts, and JavaScript validation feedback.

- [GitHub repository](https://github.com/sulumate/web_as4_Sulukhan_Aizharykova_SE2529/)
- [GitHub Pages deployment link](https://sulumate.github.io/web_as4_Sulukhan_Aizharykova_SE2529/)

## Tasks

Each task has its own page. The navigation bar on every page links to all five tasks.

| Task | Page | What it demonstrates |
| --- | --- | --- |
| 0: Simple Contact Form | `index.html` | A basic HTML contact form with name, email, message, a submit button, and labels associated with their inputs. |
| 1: HTML5 Validation | `task1.html` | A contact form using native browser validation: required fields, an email input, and minimum/maximum text lengths. |
| 2: Bootstrap Form Styling | `task2.html` | A contact form styled with Bootstrap form classes and a responsive grid, with placeholders and helper text. |
| 3: Bootstrap Validation Styles | `task3.html` | JavaScript applies `is-valid` and `is-invalid` classes and displays success or error messages for the entered data. |
| 4: Registration Form | `task4.html` | A responsive Bootstrap registration form with first and last names, email, password and confirmation, gender radio buttons, hobby checkboxes, a country dropdown, and Submit/Reset buttons. |

Task 4 combines HTML5 validation with Bootstrap feedback. Passwords must contain **8–72 characters**. JavaScript also checks that the confirmation matches the password. These are the validation rules chosen for this project; the assignment does not specify an exact password length.

## Run locally

Download or clone the repository, then open **`index.html`** in a web browser. Use the navigation bar to switch between tasks.

No package installation, development server, or build step is required. Keep the project folders together so that relative links, styles, and scripts continue to work. Bootstrap 5.3.3 CSS is bundled locally, so the pages do not need a CDN connection.

## Shared files

| File | Purpose |
| --- | --- |
| `assets/css/style.css` | Shared page styling and responsive layout adjustments. |
| `assets/js/forms.js` | Form event handling, validation feedback, password confirmation checks, and reset behavior. |
| `assets/vendor/bootstrap.min.css` | Locally bundled Bootstrap 5.3.3 styles. |

## Demo behavior

The forms are interface demonstrations. Submitting them does **not** send or store form data, send emails, or create real accounts. Validation and any displayed confirmation happen in the browser. No backend or database is included.

## Manual testing checklist

- Open all five pages through the navigation bar and confirm that links and styles load.
- On Task 1, submit empty required fields and confirm that the browser prevents submission.
- Enter an invalid email, such as `student@`, and then a valid example, such as `student@example.com`.
- Check Task 1 text inputs against their displayed minimum and maximum length rules.
- On Task 3, submit invalid and valid values and check that the input styles and feedback messages match the data. Correct an invalid value and check the updated feedback.
- On Task 4, try a password shorter than 8 characters, then one within the 8–72 character range.
- Enter a different confirmation password, check the error, then make the two passwords match.
- Complete the required registration fields with valid data and check the browser-only success feedback.
- Use Task 4's **Reset** button and confirm that form values and validation feedback return to their initial state.
- Check narrow mobile and desktop widths: fields should remain readable, the layout should adapt, and navigation should remain usable.

## GitHub Pages setup

If GitHub Pages has not already been configured for this repository:

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select the **`main`** branch and the **`/ (root)`** folder, then save.
4. Wait for GitHub's deployment to finish, then open the deployment link above.

The HTML pages and the `assets` folder should be at the repository root.

## Concepts to explain during the defense

| Concept | Explanation |
| --- | --- |
| `<form>`, `<input>`, and `<textarea>` | Group related controls, collect individual values, and accept multiline text. |
| `<label for="…">` and an input's `id` | Associate a visible label with a particular control. |
| `type="email"` | Lets the browser check the basic format of an email address. It does not prove that the address exists. |
| `required`, `minlength`, and `maxlength` | Define whether a value is needed and the allowed text length. |
| Radio buttons and checkboxes | Radio buttons with the same `name` allow one choice; checkboxes allow independent selections. |
| `<select>` and `<option>` | Provide a dropdown with predefined choices. |
| Bootstrap grid and form classes | Arrange responsive columns and style text inputs, selections, and check controls. |
| `is-valid`, `is-invalid`, and feedback elements | Display validation results. The CSS classes style the result; browser validation or JavaScript determines validity. |
| JavaScript validation | Reads form values and validity, updates feedback, and compares the two password fields. |
| Submit and Reset | Submit attempts to process the form; Reset restores the controls to their initial values. This demo also clears custom validation feedback. |
| `preventDefault()` | Stops the browser's default form submission so the static demo can show feedback on the page. |

