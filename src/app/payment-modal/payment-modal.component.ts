import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() payConfirmed = new EventEmitter<void>();

  constructor(private cartService: CartService, private router: Router) {} // Inject Router

  selectedMethod: string = '';

  closeModal() {
    this.close.emit();
  }

  pay() {
    if (this.selectedMethod) {
      this.cartService.purchaseProducts();
    alert('Compra realizada con éxito!');
    this.router.navigate(['/']); // Redirect to home after payment
    this.payConfirmed.emit();
    } else {
      alert('Por favor, seleccione un método de pago.');
    }
  }

  selectPaymentMethod(method: string) {
    this.selectedMethod = method;
    console.log(`Selected payment method: ${method}`);
  }
}
