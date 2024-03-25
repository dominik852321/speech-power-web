import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private httpClient: HttpClient) {}

  public uploadFiles(files: File[]): Observable<any> {
    const url = `${environment.apiUrl}/transcription/list`;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }
    return this.httpClient.post(url, formData);
  }

  public postKeywords(keywords: string[]): Observable<any> {
    const url = `${environment.apiUrl}/keyword`;
    return this.httpClient.post(url, keywords );
  }

  public postQuestions(questions: string[]): Observable<any> {
    const url = `${environment.apiUrl}/question`;
    return this.httpClient.post(url, questions );
  }

  public getQuestions(): Observable<any> {
    const url = `${environment.apiUrl}/question`;
    return this.httpClient.get(url);
  }

  public getKeywords(): Observable<any> {
    const url = `${environment.apiUrl}/keyword`;
    return this.httpClient.get(url);
  }
}
