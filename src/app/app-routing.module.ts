/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeginnerMenuRoutes, Level } from './shared/enums';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: Level.Beginner,
        children: [
          { path: '', redirectTo: BeginnerMenuRoutes.BinaryToDecimal, pathMatch: 'full' },
          {
            path: BeginnerMenuRoutes.BinaryToDecimal,
            loadChildren: () =>
              import('./features/beginner/binary-to-decimal/binary-to-decimal.module').then((m) => m.BinaryToDecimalModule),
          },
          {
            path: BeginnerMenuRoutes.BorderRadiusPreviewer,
            loadChildren: () =>
              import('./features/beginner/border-radius-previewer/border-radius-previewer.module').then(
                (m) => m.BorderRadiusPreviewerModule
              ),
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
