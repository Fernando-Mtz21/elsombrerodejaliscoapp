import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.container.html',
  styleUrl: './products.container.css',
})
export class ProductsContainer {
  protected products: any[] = [];
  protected visible: boolean = false;
  protected selectedProduct: any;
  protected isFav: boolean = false;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const products = navigation?.extras.state as { items: any[] };

    console.log(products);
    this.products = products?.items || [];
  }

  protected goBack(): void {
    this.router.navigate(['/']);
  }

  protected seeProduct(item: any) {
    this.visible = true;

    this.selectedProduct = item;
  }

  protected toggleFav(): void {
    this.isFav = !this.isFav;
  }

  protected closeModal(): void {
    this.visible = false;
  }
}
