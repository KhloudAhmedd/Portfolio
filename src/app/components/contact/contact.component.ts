import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {}

interface FormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

class FormValidator {
  private form: HTMLFormElement = document.getElementById('contact_form') as HTMLFormElement;
  private nameInput: HTMLInputElement = document.getElementById('your_name') as HTMLInputElement;
  private emailInput: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
  private subjectInput: HTMLInputElement = document.getElementById('subject') as HTMLInputElement;
  private messageInput: HTMLTextAreaElement = document.getElementById('message') as HTMLTextAreaElement;
  private nameError: HTMLElement = document.getElementById('name_error') as HTMLElement;
  private emailError: HTMLElement = document.getElementById('email_error') as HTMLElement;
  private subjectError: HTMLElement = document.getElementById('subject_error') as HTMLElement;
  private messageError: HTMLElement = document.getElementById('message_error') as HTMLElement;

  constructor() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.setupFieldValidation();
  }

  private setupFieldValidation(): void {
    this.nameInput.addEventListener('blur', () => this.validateField(this.nameInput, this.nameError, this.validateName));
    this.emailInput.addEventListener('blur', () => this.validateField(this.emailInput, this.emailError, this.validateEmail));
    this.subjectInput.addEventListener('blur', () => this.validateField(this.subjectInput, this.subjectError, this.validateSubject));
    this.messageInput.addEventListener('blur', () => this.validateField(this.messageInput, this.messageError, this.validateMessage));
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();
    if (this.validateForm()) {
      const formData: FormData = {
        fullName: this.nameInput.value,
        email: this.emailInput.value,
        subject: this.subjectInput.value,
        message: this.messageInput.value,
      };
      this.submitForm(formData);
    }
  }

  private validateForm(): boolean {
    return [this.validateName(this.nameInput.value), this.validateEmail(this.emailInput.value), this.validateSubject(this.subjectInput.value), this.validateMessage(this.messageInput.value)]
      .every(validation => !validation);
  }

  private validateField(input: HTMLInputElement | HTMLTextAreaElement, errorElement: HTMLElement, validationFn: (value: string) => string | null): void {
    const errorMessage = validationFn(input.value);
    errorMessage ? this.showError(input, errorElement, errorMessage) : this.clearError(input, errorElement);
  }

  private validateName(value: string): string | null {
    if (!value.trim()) return 'Name is required';
    if (value.trim().length < 2) return 'Name must be at least 2 characters';
    return /^[a-zA-Z\s]*$/.test(value) ? null : 'Name should contain only letters and spaces';
  }

  private validateEmail(value: string): string | null {
    return value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Please enter a valid email';
  }

  private validateSubject(value: string): string | null {
    return value.trim().length >= 3 ? null : 'Subject must be at least 3 characters';
  }

  private validateMessage(value: string): string | null {
    return value.trim().length >= 10 ? null : 'Message must be at least 10 characters';
  }

  private showError(input: HTMLInputElement | HTMLTextAreaElement, errorElement: HTMLElement, message: string): void {
    input.classList.add('is-invalid');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }

  private clearError(input: HTMLInputElement | HTMLTextAreaElement, errorElement: HTMLElement): void {
    input.classList.remove('is-invalid');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }

  private submitForm(formData: FormData): void {
    console.log('Form submitted with data:', formData);
    this.form.reset();
    Swal.fire({
      title: 'Message Submitted!',
      text: 'Thank you for getting in touch! I will get back to you soon.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FormValidator();
});