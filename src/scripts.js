
  (function ($) {

"use strict";

// COLOR MODE
$('.color-mode').click(function () {
  $('.color-mode-icon').toggleClass('active')
  $('body').toggleClass('dark-mode')
})

// HEADER
$(".navbar").headroom();


// SMOOTHSCROLL
$(function () {
  $('.nav-link, .custom-btn-link').on('click', function (event) {
    var $anchor = $(this);
    // Setting the duration of animation to 0 for instant scroll
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top - 49
    }, 0); // Set duration to 0ms for instant scroll
    event.preventDefault();
  });
});


// TOOLTIP
$('.social-links a').tooltip();

})(jQuery);




// FORM VALIDATION
document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("contact_form");

form.addEventListener("submit", function (event) {
  // Clear all previous error messages
  clearErrors();

  // Validate each field
  let valid = true;

  // Full Name validation
  const fullName = document.getElementById("your_name");
  const nameError = document.getElementById("name_error");
  if (!fullName.value || fullName.value.trim().split(" ").length < 2) {
    nameError.textContent = "Full Name must contain at least two words.";
    fullName.classList.add("invalid");
    valid = false;
  } else {
    fullName.classList.add("valid");
  }

  // Email validation
  const email = document.getElementById("email");
  const emailError = document.getElementById("email_error");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    emailError.textContent = "Please enter a valid email address.";
    email.classList.add("invalid");
    valid = false;
  } else {
    email.classList.add("valid");
  }

  // Subject validation (optional)
  const subject = document.getElementById("subject");
  const subjectError = document.getElementById("subject_error");
  if (subject.value && subject.value.trim().length < 3) {
    subjectError.textContent = "Subject must be at least 3 characters long.";
    subject.classList.add("invalid");
    valid = false;
  } else {
    subject.classList.add("valid");
  }

  // Message validation
  const message = document.getElementById("message");
  const messageError = document.getElementById("message_error");
  if (!message.value || message.value.trim().length < 10) {
    messageError.textContent = "Message must be at least 10 characters long.";
    message.classList.add("invalid");
    valid = false;
  } else {
    message.classList.add("valid");
  }

  // If validation fails, prevent form submission
  if (!valid) {
    event.preventDefault();
  } else {
    // Prevent form submission
    event.preventDefault();

    // Show SweetAlert if the form is valid
    Swal.fire({
      title: 'Message Submitted!',
      text: 'Thank you for getting in touch! I will get back to you soon.',
      icon: 'success',
      confirmButtonText: 'OK'
    });

    // Optionally, you can clear the form fields here
    form.reset();
    clearErrors();
  }
});

function clearErrors() {
  // Clear error messages and reset input styles
  document.querySelectorAll(".error").forEach((small) => small.textContent = "");
  document.querySelectorAll(".form-input").forEach((input) => input.classList.remove("invalid", "valid"));
}
});

