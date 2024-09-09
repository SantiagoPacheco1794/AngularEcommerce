import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service'; // Adjust the path as necessary

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  cartItems: any[] = [];
  savedItems: any[] = [];
  cartSummary = { numberOfProducts: 0, totalPrice: 0 };
  shippingCost: number = 0;
  totalAmount: number = 0;
  isModalOpen: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.savedItems = this.cartService.getSavedItems();
    this.updateCartSummary();
  }

  updateCartSummary(): void {
    const { numberOfProducts, totalPrice } = this.cartService.getCartSummary();
    this.cartSummary = { numberOfProducts, totalPrice };
    this.shippingCost = this.generateRandomShippingCost();
    this.totalAmount = totalPrice + this.shippingCost;
  }

  generateRandomShippingCost(): number {
    return Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000; // Random number between 2000 and 5000
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.cartService.updateCart(this.cartItems); // Ensure the service updates the cart
    this.updateCartSummary();
  }

  saveForLater(item: any): void {
    this.cartService.saveItem(item); // Only call the service to handle saving
    this.removeFromCart(item.product.id); // Remove the item from the cart after saving it
    this.savedItems = this.cartService.getSavedItems(); // Refresh saved items from the service
  }

  addToCartFromSaved(item: any): void {
    this.cartService.addToCart(item.product, item.quantity);
    this.removeFromSaved(item.product.id);
    this.cartItems = this.cartService.getCart();
    this.updateCartSummary();
  }

  removeFromSaved(productId: number): void {
    this.savedItems = this.savedItems.filter(item => item.product.id !== productId);
    this.cartService.updateSavedItems(this.savedItems);
  }

  openPaymentModal(): void {
    this.isModalOpen = true;
  }

  closePaymentModal(): void {
    this.isModalOpen = false;
  }

  completePurchase(): void {
    this.cartItems.forEach(item => {
      // Assuming the cartService has a method to update the product quantity
      this.cartService.updateProductQuantity(item.product.id, item.product.initial_quantity - item.quantity);
    });
    this.cartService.updateCart([]); // Clear the cart
    this.closePaymentModal();
    this.ngOnInit(); // Refresh cart data
  }
}
