import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ChristmasLightsModule } from '../../christmas-lights.module';
import { ChristmasLightsComponent } from './christmas-lights.component';

describe(ChristmasLightsComponent.name, () => {
  let spectator: Spectator<ChristmasLightsComponent>;
  const createComponent = createComponentFactory({
    component: ChristmasLightsComponent,
    imports: [ChristmasLightsModule],
    declareComponent: false,
  });
  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
