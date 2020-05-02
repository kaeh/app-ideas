import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Level } from '@kaeh/shared/enums';
import { nameof } from '@kaeh/shared/functions';
import { AssetsService } from './assets.service';

describe(AssetsService.name, () => {
  let service: AssetsService;
  let httpClientMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AssetsService);
    httpClientMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpClientMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(nameof<AssetsService>('getReadme'), () => {
    it('should add .md when parameters does not have it', () => {
      // Given a resource without .md extension
      const resource = 'a_resource';

      // When I call service.getReadme with this resource
      service.getReadme(resource).subscribe();

      // Then the resource should have been append with .md extension
      const req = httpClientMock.expectOne(`assets/${resource}.md`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('should not add .md when parameters have it', () => {
      // Given a resource with .md extension
      const resource = 'a_resource.md';

      // When I call service.getReadme with this resource
      service.getReadme(resource).subscribe();

      // Then the resource shouldn't have been change
      const req = httpClientMock.expectOne(`assets/${resource}`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('should add a level if set', () => {
      // Given a resource with .md extension
      const resource = 'a_resource.md';
      // and a level
      const level = Level.Beginner;

      // When I call service.getReadme with those parameters
      service.getReadme(resource, level).subscribe();

      // Then the level directory should have been prepend to the resource
      const req = httpClientMock.expectOne(`assets/${level}/${resource}`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('should not add a level if parameters is not set', () => {
      // Given a resource with .md extension
      const resource = 'a_resource.md';
      // and no level
      const level = undefined;

      // When I call service.getReadme with those parameters
      service.getReadme(resource, level).subscribe();

      // Then the level directory should have been prepend to the resource
      const req = httpClientMock.expectOne(`assets/${resource}`);
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });
  });
});
