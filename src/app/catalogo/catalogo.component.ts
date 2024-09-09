import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit{
  productos: any[] = [];
  selectedProductDetail: any = null;
  
  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productosService.getProductos().subscribe({
      next: (response) => {
        this.productos = response.results;
      },
      error: (error) => {
        console.error('Error al obenter los productos:', error);
      },
    });
  }

  showProductDetail(productId: string): void {
    this.productosService.getProductDetail(productId).subscribe({
      next: (detail) => {
        this.selectedProductDetail = detail;
        console.log('Product Detail:', detail);
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      },
    });
  }
}
