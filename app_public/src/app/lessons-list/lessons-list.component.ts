import { Component, OnInit } from '@angular/core';
import { FluentDataService } from '../fluent-data.service';
import { AuthenticationService } from '../authentication.service';

export class Lesson {
  _id: string;
  title: string;
  translation: string;
  imageURL: string;
  dialogue: string;
}

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.pug',
  styleUrls: ['./lessons-list.component.css']
})

export class LessonsListComponent implements OnInit {

  constructor(
    private fluentDataService: FluentDataService,
    private authenticationService: AuthenticationService
  ) { }

  public lessons: Lesson[];

  private getLessons(): void {
    this.fluentDataService
      .getLessons()
        .then(foundLessons => this.lessons = foundLessons);
  }

  ngOnInit() {
    this.getLessons();
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public getUsername(): string {
    const { name } = this.authenticationService.getCurrentUser();
    return name ? name : 'Guest';
  }

}
