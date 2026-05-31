import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { MenuService } from '@services/menu.service';
import { FavService } from '@services/fav.service';
import { SpinnerService } from '@services/spinner.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, DialogModule, ButtonModule],
  templateUrl: './favorites.container.html',
  styleUrls: ['./favorites.container.css'],
})
export class FavoritesContainer implements OnInit {
  protected favProducts: any[] = [];
  protected selectedProduct: any;
  protected visible: boolean = false;
  protected isFav: boolean = false;
  protected loading: boolean = false;

  constructor(
    private menuService: MenuService,
    private favService: FavService,
    private spinnerService: SpinnerService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.spinnerService.show();
    this.menuService.getMenu().subscribe({
      next: (menu: any[]) => {
        const favIds = this.favService.getFavIds();
        const allProducts: any[] = [];
        for (const section of menu) {
          for (const category of section.categories ?? []) {
            allProducts.push(...(category.products ?? []));
          }
        }
        this.favProducts = allProducts.filter(p => favIds.includes(p.idProduct));
      },
      error: (err) => console.error('Error loading favorites:', err),
      complete: () => {
        this.loading = false;
        this.spinnerService.hide();
        this.cd.detectChanges();
      },
    });
  }

  protected seeProduct(item: any): void {
    this.selectedProduct = item;
    this.isFav = this.favService.isItemFav(item.idProduct);
    this.visible = true;
  }

  protected toggleFav(): void {
    this.favService.toggleFav(this.selectedProduct.idProduct);
    this.isFav = !this.isFav;
    if (!this.isFav) {
      this.favProducts = this.favProducts.filter(
        p => p.idProduct !== this.selectedProduct.idProduct
      );
      this.closeModal();
    }
  }

  protected closeModal(): void {
    this.visible = false;
  }
}
