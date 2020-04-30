import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Level } from '@kaeh/shared/enums';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  public constructor(private readonly _httpClient: HttpClient) {}

  public getMainReadme(): Observable<string> {
    return this.getReadme('README.md');
  }

  public getReadme(resource: string, level?: Level): Observable<string> {
    const fileName = resource.endsWith('.md') ? resource : `${resource}.md`;
    const filePath = level ? `assets/${level}/${fileName}` : `assets/${fileName}`;

    return this._httpClient.get(filePath, { responseType: 'text' });
  }
}
