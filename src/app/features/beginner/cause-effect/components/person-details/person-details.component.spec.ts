import { CauseEffectModule } from '@kaeh/cause-effect/cause-effect.module';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PersonDetailsComponent } from './person-details.component';

describe(PersonDetailsComponent.name, () => {
  let spectator: Spectator<PersonDetailsComponent>;
  const createComponent = createComponentFactory({
    component: PersonDetailsComponent,
    imports: [CauseEffectModule],
    declareComponent: false,
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
