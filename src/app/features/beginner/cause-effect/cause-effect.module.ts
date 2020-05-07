import { NgModule } from '@angular/core';
import { CauseEffectRoutingModule } from './cause-effect-routing.module';
import { CauseEffectComponent } from './components/cause-effect.component';

@NgModule({
  declarations: [CauseEffectComponent],
  imports: [CauseEffectRoutingModule],
})
export class CauseEffectModule {}
