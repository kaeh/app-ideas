import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Level } from '@kaeh/shared/enums';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  public constructor(private readonly _httpClient: HttpClient) {}

  public getReadme(resource: string, level?: Level): Observable<string> {
    if (!resource.endsWith('.md')) {
      return this.getReadme(`${resource}.md`, level);
    }

    const filePath = level ? `assets/${level}/${resource}` : `assets/${resource}`;

    return this._httpClient.get(filePath, { responseType: 'text' });
  }
}
