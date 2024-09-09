import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  // Define the model with default values
  user = {
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    password: ''
    
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Registro exitoso:', this.user);
    }
  }

}
