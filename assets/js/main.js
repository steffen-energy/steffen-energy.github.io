const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status"); // 👈 RENAMED from 'status'

async function handleSubmit(event) {
  event.preventDefault(); // This stops the browser from redirecting
  const data = new FormData(event.target);

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      formStatus.innerHTML = "Thanks for your submission! I'll be in touch soon."; // 👈 RENAMED
      formStatus.style.color = 'green'; // 👈 RENAMED
      form.reset(); // Clears the form fields
      form.style.display = 'none'; // Optional: hide the form after submission
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ") // 👈 RENAMED
        } else {
          formStatus.innerHTML = "Oops! There was a problem submitting your form"; // 👈 RENAMED
        }
        formStatus.style.color = 'red'; // 👈 RENAMED
      })
    }
  }).catch(error => {
    formStatus.innerHTML = "Oops! There was a problem submitting your form"; // 👈 RENAMED
    formStatus.style.color = 'red'; // 👈 RENAMED
  });
}
form.addEventListener("submit", handleSubmit);