import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BinaryToDecimalComponent } from './components/binary-to-decimal.component';

const routes: Routes = [{ path: '', component: BinaryToDecimalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BinaryToDecimalRoutingModule {}
