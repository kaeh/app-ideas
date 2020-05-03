import { NgModule } from '@angular/core';
import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorComponent } from './components/calculator.component';

@NgModule({
  declarations: [CalculatorComponent],
  imports: [CalculatorRoutingModule],
})
export class CalculatorModule {}
