import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ResumeComponent } from './components/resume/resume.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import Swal from 'sweetalert2';
import Headroom from 'headroom.js';
import "bootstrap";
import 'bootstrap/js/dist/tooltip';
import $ from 'jquery';

  

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,AboutComponent,SkillsComponent,ProjectsComponent,ResumeComponent,ContactComponent,FooterComponent, CarouselModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
// export class AppComponent {
//   title = 'DEPIFinalProjectAngular';

// }

export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.applyJQueryScripts();
    this.setupFormValidation();
  }

  // This method contains the converted jQuery functionalities.
  applyJQueryScripts(): void {
    // COLOR MODE Toggle
    $('.color-mode').on('click', () => {
      $('.color-mode-icon').toggleClass('active');
      $('body').toggleClass('dark-mode');
    });

    // HEADER with Headroom (if using Headroom library)
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      const headroom = new Headroom(navbar);
      headroom.init();
    }
    

    // SMOOTH SCROLL
    $('.nav-link, .custom-btn-link').on('click', function (event) {
      event.preventDefault();
    
      // Get the target element from the 'href' attribute
      const targetElement = $(this).attr('href');
      if (targetElement) {
        // Ensure the offset value is not undefined
        const scrollTopValue = $(targetElement).offset()?.top ?? 0;
        
        // Smooth scroll to the target element, adjusting for the navbar offset
        $('html, body').animate({
          scrollTop: scrollTopValue - 49
        }, 0);
      }
    });
    

    // TOOLTIP Initialization
    $('.social-links a').tooltip();
  }

  ngAfterViewInit() {
    $('[data-toggle="tooltip"]').tooltip(); // Initialize all tooltips in the component
}

  // Form validation logic
  setupFormValidation(): void {
    const form = document.getElementById("contact_form") as HTMLFormElement | null;
    if (form) {
      form.addEventListener("submit", (event: Event) => {
        event.preventDefault(); // Prevent default form submission
        this.clearErrors();
  
        let valid = true;
  
        // Full Name validation
        const fullName = document.getElementById("your_name") as HTMLInputElement | null;
        const nameError = document.getElementById("name_error");
        if (fullName && (!fullName.value || fullName.value.trim().split(" ").length < 2)) {
          if (nameError) nameError.textContent = "Full Name must contain at least two words.";
          fullName?.classList.add("invalid");
          valid = false;
        } else if (fullName) {
          fullName.classList.remove("invalid");
          fullName.classList.add("valid");
        }
  
        // Email validation
        const email = document.getElementById("email") as HTMLInputElement | null;
        const emailError = document.getElementById("email_error");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailPattern.test(email.value)) {
          if (emailError) emailError.textContent = "Please enter a valid email address.";
          email?.classList.add("invalid");
          valid = false;
        } else if (email) {
          email.classList.remove("invalid");
          email.classList.add("valid");
        }
  
        // Subject validation (optional field)
        const subject = document.getElementById("subject") as HTMLInputElement | null;
        const subjectError = document.getElementById("subject_error");
        if (subject && subject.value.trim().length > 0 && subject.value.trim().length < 3) {
          if (subjectError) subjectError.textContent = "Subject must be at least 3 characters long.";
          subject?.classList.add("invalid");
          valid = false;
        } else if (subject) {
          subject.classList.remove("invalid");
          subject.classList.add("valid");
        }
  
        // Message validation
        const message = document.getElementById("message") as HTMLTextAreaElement | null;
        const messageError = document.getElementById("message_error");
        if (message && (!message.value || message.value.trim().length < 10)) {
          if (messageError) messageError.textContent = "Message must be at least 10 characters long.";
          message?.classList.add("invalid");
          valid = false;
        } else if (message) {
          message.classList.remove("invalid");
          message.classList.add("valid");
        }
  
        // Show success message if form is valid
        if (valid) {
          Swal.fire({
            title: 'Message Submitted!',
            text: 'Thank you for getting in touch! I will get back to you soon.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          form.reset();
          this.clearErrors();
        }
      });
    }
  }
  
  // Helper method to clear errors
  clearErrors(): void {
    document.querySelectorAll(".error").forEach((small) => (small.textContent = ""));
    document.querySelectorAll(".form-input").forEach((input) => input.classList.remove("invalid", "valid"));
  }
  
  
}