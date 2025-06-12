import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MainContainer } from './containers/main/main.container';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ProductsContainer } from './containers/products/products.container';

@NgModule({
  declarations: [MainContainer, ProductsContainer],
  imports: [
    CardModule,
    DialogModule,
    CommonModule,
    MenuRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, './asset/i18n/', '.json');
        },
        deps: [HttpClient],
      },
    }),
  ],
})
export class MenuModule {}
