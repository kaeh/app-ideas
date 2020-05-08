import { NgModule } from '@angular/core';
import { SharedModule } from '@kaeh/shared/shared.module';
import { CauseEffectRoutingModule } from './cause-effect-routing.module';
import { CauseEffectComponent } from './components/cause-effect/cause-effect.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { PersonsListComponent } from './components/persons-list/persons-list.component';
import { PersonStateService } from './state';

@NgModule({
  declarations: [CauseEffectComponent, PersonsListComponent, PersonDetailsComponent],
  imports: [CauseEffectRoutingModule, SharedModule],
  providers: [PersonStateService],
})
export class CauseEffectModule {}
