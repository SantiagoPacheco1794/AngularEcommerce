import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  // Submit the form
  onSubmit() {
    this.contactForm.markAllAsTouched(); // Ensure all fields are marked as touched
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
      // Show alert
      this.contactForm.reset();
      alert('Se ha enviado su mensaje al Administrador, se le responderá a la brevedad');
    } else {
      console.log('Form is invalid');
    }
  }

  // Mark all controls as touched
  private markAllAsTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  // Cancel the form
  onCancel() {
    this.contactForm.reset(); // Reset the form fields
  }
}
