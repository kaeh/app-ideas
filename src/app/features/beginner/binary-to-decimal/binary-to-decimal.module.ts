import { NgModule } from '@angular/core';
import { SharedModule } from '@kaeh/shared/shared.module';
import { BinaryToDecimalRoutingModule } from './binary-to-decimal-routing.module';
import { BinaryToDecimalComponent } from './components/binary-to-decimal.component';

@NgModule({
  declarations: [BinaryToDecimalComponent],
  imports: [BinaryToDecimalRoutingModule, SharedModule],
})
export class BinaryToDecimalModule {}
