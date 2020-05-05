import { NgModule } from '@angular/core';
import { SharedModule } from '@kaeh/shared/shared.module';
import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorComponent } from './components/calculator.component';

@NgModule({
  declarations: [CalculatorComponent],
  imports: [CalculatorRoutingModule, SharedModule],
})
export class CalculatorModule {}
