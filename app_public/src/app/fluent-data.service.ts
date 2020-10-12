import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Lesson } from './lessons-list/lessons-list.component';
import { Dialogue } from './dialogue/dialogue.component';

import { User } from './user';
import { AuthResponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root'
})

export class FluentDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  //private apiBaseUrl = 'http://localhost:3000/api';
  private apiBaseUrl = 'http://lit-tor-33173.herokuapp.com/api';

  public getLessons(): Promise<Lesson[]> {
    const url: string = `${this.apiBaseUrl}/lessons`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('fluent-token')}`
      })
    };

    return this.http
      .get(url, httpOptions)
      .toPromise()
      .then(response => response as Lesson[])
      .catch(this.handleError);
  }

  public getDialogue(dialogueId: string): Promise<Dialogue> {
    const url: string = `${this.apiBaseUrl}/dialogues/${dialogueId}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Dialogue)
      .catch(this.handleError);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;

    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

}
