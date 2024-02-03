import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public login(loginForm: any): Observable<any> {
    const url = `${environment.apiUrl}/authorization`;
    return this.httpClient.post(url, loginForm, {responseType: 'text'} );
  }
}
