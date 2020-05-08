import { NgModule } from '@angular/core';
import { CauseEffectRoutingModule } from './cause-effect-routing.module';
import { CauseEffectComponent } from './components/cause-effect/cause-effect.component';
import { PersonsListComponent } from './components/persons-list/persons-list.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';

@NgModule({
  declarations: [CauseEffectComponent, PersonsListComponent, PersonDetailsComponent],
  imports: [CauseEffectRoutingModule],
})
export class CauseEffectModule {}
