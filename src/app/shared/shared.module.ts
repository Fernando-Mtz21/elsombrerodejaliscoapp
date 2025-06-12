import { NgModule } from '@angular/core';
import { LayoutContainer } from './containers/layout/layout.container';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LayoutContainer],
  imports: [CommonModule, RouterModule],
  exports: [LayoutContainer],
})
export class SharedModule {}
