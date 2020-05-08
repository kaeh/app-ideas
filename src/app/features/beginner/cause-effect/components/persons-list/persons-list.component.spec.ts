import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PersonsListComponent } from './persons-list.component';

describe(PersonsListComponent.name, () => {
  let spectator: Spectator<PersonsListComponent>;
  const createComponent = createComponentFactory(PersonsListComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
