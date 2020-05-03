import { NgModule } from '@angular/core';
import { SharedModule } from '@kaeh/shared/shared.module';
import { BinaryToDecimalRoutingModule } from './bin-2-dec-routing.module';
import { BinaryToDecimalComponent } from './components/bin-2-dec.component';

@NgModule({
  declarations: [BinaryToDecimalComponent],
  imports: [BinaryToDecimalRoutingModule, SharedModule],
})
export class BinaryToDecimalModule {}
