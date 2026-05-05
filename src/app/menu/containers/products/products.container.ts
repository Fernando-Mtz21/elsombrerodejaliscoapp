import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FavService } from '@services/fav.service';
import { count } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.container.html',
  styleUrl: './products.container.css',
})
export class ProductsContainer {
  protected products: any[] = [];
  protected categories: any[] = [];
  protected visible: boolean = false;
  protected selectedProduct: any;
  protected images: any[] = [];
  protected isFav: boolean = false;

  constructor(private router: Router, private favService: FavService) {
    const navigation = this.router.getCurrentNavigation();
    const products = navigation?.extras.state as {
    products: any[];
    categories: any[];
    };

    if (!products) {
      this.goBack();
    }

  this.products = products?.products || [];
  this.categories = products?.categories || [];
  const shuffled = [...this.products];
    for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
let selected = shuffled.slice(0, 5);
    while (selected.length < 3 && this.products.length > 0) {
    const randomIndex = Math.floor(Math.random() * this.products.length);
    const candidate = this.products[randomIndex];
 if (!selected.includes(candidate) || this.products.length < 3) {
    selected.push(candidate);
    }
}
this.images = selected;
    }

    protected goBack(): void {
    this.router.navigate(['/Categories'], {
    state: { categories: this.categories },
    });
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
