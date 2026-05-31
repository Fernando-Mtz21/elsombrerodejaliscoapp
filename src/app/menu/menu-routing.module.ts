import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContainer } from './containers/main/main.container';
import { ProductsContainer } from './containers/products/products.container';
import { CategoriesContainer } from './containers/categories/categories.container';
import { FaqContainer } from './containers/faq/faq.container';
import { FavoritesContainer } from './containers/favorites/favorites.container';

const routes: Routes = [
  {
    path: '',
    component: MainContainer,
  },
  {
    path: 'Categories',
    component: CategoriesContainer,
  },
  {
    path: 'Products',
    component: ProductsContainer,
  },
  {
    path: 'Faq',
    component: FaqContainer,
  },
  {
    path: 'Favorites',
    component: FavoritesContainer,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
