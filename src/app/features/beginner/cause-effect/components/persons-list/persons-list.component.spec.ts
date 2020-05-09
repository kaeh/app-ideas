import { CauseEffectModule } from '@kaeh/cause-effect/cause-effect.module';
import { Person } from '@kaeh/cause-effect/interfaces';
import { nameof } from '@kaeh/shared/functions';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PersonsListComponent } from './persons-list.component';

describe(PersonsListComponent.name, () => {
  let spectator: Spectator<PersonsListComponent>;
  const createComponent = createComponentFactory({
    component: PersonsListComponent,
    imports: [CauseEffectModule],
    declareComponent: false,
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });

  describe(nameof<PersonsListComponent>('selectedPerson'), () => {
    it('should change when selected person change', () => {
      // Given a person to select
      const person: Person = {
        id: 'e078b356',
        name: 'John Doe',
        street: 'foo',
        city: 'bar',
        state: 'foobar',
        birthday: new Date(1992, 3, 21),
        telephone: '123-456-789',
      };

      // When user change selected person
      spectator.component.selectPerson(person);

      // Then the new selected person should be this one
      spectator.component.selectedPerson = person;
    });
  });
});
