import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../services/productos.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {
  productDetail: any = null; // Store the product details
  selectedImage: any = null; // Store the selected image
  maxVisibleImages: number = 3; // Set the maximum number of images to display
  desiredQuantity: number = 1; // Default value for quantity input

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Get the product ID from the route parameter and fetch details
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.getProductDetail(productId);
    }
  }

  // Method to fetch the product detail using the service
  getProductDetail(productId: string): void {
    this.productosService.getProductDetail(productId).subscribe({
      next: (detail) => {
        this.productDetail = detail;
        // Set the initial selected image
        if (this.productDetail.pictures.length > 0) {
          this.selectedImage = this.productDetail.pictures[0];
        }
        // Ensure desiredQuantity does not exceed initial_quantity
        this.desiredQuantity = Math.min(this.desiredQuantity, this.productDetail.initial_quantity);
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      },
    });
  }

  // Method to handle image selection
  selectImage(picture: any): void {
    this.selectedImage = picture;
  }

  addToCart(): void {
    if (this.productDetail && this.desiredQuantity > 0) {
      this.cartService.addToCart(this.productDetail, this.desiredQuantity);
      alert('Producto agregado al carrito!');
    }
  }
}
