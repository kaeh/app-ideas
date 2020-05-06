import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChristmasLightsComponent } from './components/christmas-lights/christmas-lights.component';

const routes: Routes = [{ path: '', component: ChristmasLightsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChristmasLightsRoutingModule {}
