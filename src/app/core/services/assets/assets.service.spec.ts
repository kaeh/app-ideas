import { Level } from '@kaeh/shared/enums';
import { nameof } from '@kaeh/shared/functions';
import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator/jest';
import { AssetsService } from './assets.service';

describe(AssetsService.name, () => {
  let spectator: SpectatorHttp<AssetsService>;
  const createHttp = createHttpFactory(AssetsService);

  beforeEach(() => (spectator = createHttp()));

  it('should be created', () => {
    expect(spectator.dataService).toBeTruthy();
  });

  describe(nameof<AssetsService>('getReadme'), () => {
    it('should add .md when parameters does not have it', () => {
      // Given a resource without .md extension
      const resource = 'a_resource';

      // When I call service.getReadme with this resource
      spectator.dataService.getReadme(resource).subscribe();

      // Then the resource should have been append with .md extension
      spectator.expectOne(`assets/${resource}.md`, HttpMethod.GET);
    });

    it('should not add .md when parameters have it', () => {
      // Given a resource with .md extension
      const resource = 'a_resource.md';

      // When I call service.getReadme with this resource
      spectator.dataService.getReadme(resource).subscribe();

      // Then the resource shouldn't have been change
      spectator.expectOne(`assets/${resource}`, HttpMethod.GET);
    });

    it('should add a level if set', () => {
      // Given a resource with .md extension
      const resource = 'a_resource.md';
      // and a level
      const level = Level.Beginner;

      // When I call service.getReadme with those parameters
      spectator.dataService.getReadme(resource, level).subscribe();

      // Then the level directory should have been prepend to the resource
      spectator.expectOne(`assets/${level}/${resource}`, HttpMethod.GET);
    });

    it('should not add a level if parameters is not set', () => {
      // Given a resource with .md extension
      const resource = 'a_resource.md';
      // and no level
      const level = undefined;

      // When I call service.getReadme with those parameters
      spectator.dataService.getReadme(resource, level).subscribe();

      // Then the level directory should have been prepend to the resource
      spectator.expectOne(`assets/${resource}`, HttpMethod.GET);
    });
  });
});
