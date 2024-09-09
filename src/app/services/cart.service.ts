import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private savedItems: any[] = [];
  private initialQuantities: { [productId: string]: number } = {}; // Store initial quantities of products

  // Add a product to the cart
  addToCart(product: any, quantity: number): void {
    const existingProduct = this.cart.find(item => item.product.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.cart.push({ product, quantity });
    }
    // Save the initial quantity if not already saved
    if (!this.initialQuantities[product.id]) {
      this.initialQuantities[product.id] = product.initial_quantity;
    }
  }
  

  // Get the current cart
  getCart(): any[] {
    return this.cart;
  }

  // Get a summary of the cart
  getCartSummary(): { numberOfProducts: number, totalPrice: number } {
    const numberOfProducts = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    return { numberOfProducts, totalPrice };
  }

  // Update the cart with new items
  updateCart(cart: any[]): void {
    this.cart = cart;
  }

  // Save an item to the saved items list
  saveItem(item: any): void {
    this.savedItems.push(item);
  }

  // Get the list of saved items
  getSavedItems(): any[] {
    return this.savedItems;
  }

  // Update the list of saved items
  updateSavedItems(savedItems: any[]): void {
    this.savedItems = savedItems;
  }

  // Update the quantity of a product in the cart
  updateProductQuantity(productId: number, newQuantity: number): void {
    const product = this.cart.find(item => item.product.id === productId);
    if (product) {
      product.quantity = newQuantity;
    }
  }

  // Reduce the stock of products based on the quantities bought when "Pagar" is clicked
  purchaseProducts(): void {
    this.cart.forEach(item => {
      const initialQuantity = this.initialQuantities[item.product.id];
      const newQuantity = initialQuantity - item.quantity;

      // Update the initial quantity after purchase
      this.initialQuantities[item.product.id] = newQuantity;

      // Log or handle the updated quantity as needed, e.g., send it to the backend
      console.log(`Product ID: ${item.product.id}, New Stock: ${newQuantity}`);
    });

    // Clear the cart after purchase
    this.cart = [];
  }
}
