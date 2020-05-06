import { NgModule } from '@angular/core';
import { ChristmasLightsRoutingModule } from './christmas-lights-routing.module';
import { ChristmasLightsComponent } from './components/christmas-lights/christmas-lights.component';

@NgModule({
  declarations: [ChristmasLightsComponent],
  imports: [ChristmasLightsRoutingModule],
})
export class ChristmasLightsModule {}
