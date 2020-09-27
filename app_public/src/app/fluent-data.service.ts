import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Lesson } from './lessons-list/lessons-list.component';

@Injectable({
  providedIn: 'root'
})
export class FluentDataService {

  constructor(private http: HttpClient) { }

  //private apiBaseUrl = 'http://localhost:3000/api';
  private apiBaseUrl = 'http://lit-tor-33173.herokuapp.com/api';

  public getLessons(): Promise<Lesson[]> {
    //const url: string = `${this.apiBaseUrl}/lessons}`;
    const url: string = `${this.apiBaseUrl}/lessons`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Lesson[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

}
