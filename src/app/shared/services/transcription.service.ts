import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TranscriptionService {
  constructor(private httpClient: HttpClient) {}

  public submitForm(form: File): Observable<any> {
    const url = `${environment.apiUrl}/transcription`;

    const formData = new FormData();
    formData.append('file', form);
    formData.append('description', form.name);
    return this.httpClient.post(url, formData);
  }

  public getTranscribtions(): Observable<any> {
    const url = `${environment.apiUrl}/transcription`;
    return this.httpClient.get(url);
  }

  public getTranscribtionDetailsById(id: string): Observable<any> {
    const url = `${environment.apiUrl}/transcription/${id}`;
    return this.httpClient.get(url);
  }

  
  public getTranscribtionAudioById(id: string): Observable<any> {
    const url = `${environment.apiUrl}/transcription/${id}/audio`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }
}
