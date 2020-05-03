import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BinaryToDecimalComponent } from './components/bin-2-dec.component';

const routes: Routes = [{ path: '', component: BinaryToDecimalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BinaryToDecimalRoutingModule {}
