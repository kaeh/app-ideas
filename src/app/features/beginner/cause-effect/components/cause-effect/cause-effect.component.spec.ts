import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MockComponents } from 'ng-mocks';
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { PersonsListComponent } from '../persons-list/persons-list.component';
import { CauseEffectComponent } from './cause-effect.component';

describe(CauseEffectComponent.name, () => {
  let spectator: Spectator<CauseEffectComponent>;
  const createComponent = createComponentFactory({
    component: CauseEffectComponent,
    declarations: [MockComponents(PersonsListComponent, PersonDetailsComponent)],
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
