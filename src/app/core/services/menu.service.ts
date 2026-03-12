import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  public getMenu(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiBaseUrl}/api/menu`,
      this.httpOptions
    );
  }

   public getLabels(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiBaseUrl}/api/label`,
      this.httpOptions
    );
  }
}
