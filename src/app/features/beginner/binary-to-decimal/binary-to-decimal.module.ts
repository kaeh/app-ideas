import { NgModule } from '@angular/core';
import { BinaryToDecimalRoutingModule } from './binary-to-decimal-routing.module';
import { BinaryToDecimalComponent } from './components/binary-to-decimal.component';

@NgModule({
  declarations: [BinaryToDecimalComponent],
  imports: [BinaryToDecimalRoutingModule],
})
export class BinaryToDecimalModule {}
