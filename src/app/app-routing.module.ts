import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutContainer } from '@shared/containers/layout/layout.container';

const routes: Routes = [
  //Add the modules as the following example:
  /*
  {
    path: 'Operation',
    component: LayoutContainer,
    canActivate: [AuthGuard], // If required.
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./operation/operation.module').then(
            (module) => module.OperationModule
          ),
      },
    ],
  }
  */
  {
    path: '',
    component: LayoutContainer,
    // canActivate: [AuthGuard], // If required.
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./menu/menu.module').then((module) => module.MenuModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
