// Hamburger nav menu
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');

navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
});

// Optional: Close menu when a link is clicked (for single-page nav)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-open');
    });
});

// Form submit response
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

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
      formStatus.innerHTML = "Thanks for your submission! I'll be in touch soon.";
      formStatus.style.color = 'green';
      form.reset(); // Clears the form fields
      form.style.display = 'none'; // Optional: hide the form after submission
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          formStatus.innerHTML = "Oops! There was a problem submitting your form";
        }
        formStatus.style.color = 'red';
      })
    }
  }).catch(error => {
    formStatus.innerHTML = "Oops! There was a problem submitting your form";
    formStatus.style.color = 'red';
  });
}
form.addEventListener("submit", handleSubmit);