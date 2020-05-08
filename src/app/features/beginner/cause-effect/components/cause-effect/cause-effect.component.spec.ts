import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { CauseEffectComponent } from './cause-effect.component';

describe(CauseEffectComponent.name, () => {
  let spectator: Spectator<CauseEffectComponent>;
  const createComponent = createComponentFactory(CauseEffectComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
