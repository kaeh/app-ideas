/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '@kaeh/views';
import { BeginnerMenuRoutes } from './shared/enums';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MenuComponent },
      { path: ':level', component: MenuComponent },
      {
        path: 'beginner',
        component: MenuComponent,
        children: [
          {
            path: BeginnerMenuRoutes.BinaryToDecimal,
            loadChildren: () =>
              import('./features/beginner/binary-to-decimal/binary-to-decimal.module').then((m) => m.BinaryToDecimalModule),
          },
        ],
      },
    ],
  },
  // Handle all other routes
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
