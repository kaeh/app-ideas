import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '@kaeh/views';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MenuComponent },
      { path: ':level', component: MenuComponent },
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
