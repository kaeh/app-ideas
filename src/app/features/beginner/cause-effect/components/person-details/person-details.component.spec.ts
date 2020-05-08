import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PersonDetailsComponent } from './person-details.component';

describe(PersonDetailsComponent.name, () => {
  let spectator: Spectator<PersonDetailsComponent>;
  const createComponent = createComponentFactory(PersonDetailsComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
