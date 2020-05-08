import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { CauseEffectModule } from '../cause-effect.module';
import { CauseEffectComponent } from './cause-effect.component';

describe(CauseEffectComponent.name, () => {
  let spectator: Spectator<CauseEffectComponent>;
  const createComponent = createComponentFactory({
    component: CauseEffectComponent,
    imports: [CauseEffectModule],
    declareComponent: false,
  });
  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
