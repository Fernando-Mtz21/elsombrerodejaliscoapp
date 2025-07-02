import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FavService } from '@services/fav.service';

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

  constructor(private router: Router, private favService: FavService) {
    const navigation = this.router.getCurrentNavigation();
    const products = navigation?.extras.state as { items: any[] };

    if (!products) {
      this.goBack();
    }

    console.log(products);
    this.products = products?.items || [];
  }

  protected goBack(): void {
    this.router.navigate(['/']);
  }

  protected seeProduct(item: any) {
    this.visible = true;

    this.selectedProduct = item;

    this.isFav = this.favService.isItemFav(this.selectedProduct.idProduct);
  }

  protected toggleFav(): void {
    console.log('SELECTED PROD: ', this.selectedProduct);
    this.favService.toggleFav(this.selectedProduct.idProduct);
    this.isFav = !this.isFav;
  }

  protected closeModal(): void {
    this.visible = false;
  }
}
