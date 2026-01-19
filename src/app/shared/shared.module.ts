import { NgModule } from '@angular/core';
import { LayoutContainer } from './containers/layout/layout.container';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LayoutContainer, NavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [LayoutContainer, NavbarComponent],
})
export class SharedModule { }
