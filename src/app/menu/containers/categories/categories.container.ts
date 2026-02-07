import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.container.html',
  styleUrl: './categories.container.css',
})
export class CategoriesContainer {
  protected categories: any[] = [];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const categories = navigation?.extras.state as { categories: any[] };
    if (!categories?.categories?.length) {
      this.goBack();
    }

    this.categories = categories?.categories || [];
    console.log(this.categories)
  }

  protected seeProduct(products: any) {
    this.router.navigate(['/Products'], {
      state: { products, categories: this.categories },
    });
  }

  protected goBack(): void {
    this.router.navigate(['/']);
  }
}
