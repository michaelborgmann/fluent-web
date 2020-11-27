import { Component, OnInit } from '@angular/core';
import { FluentDataService } from '../fluent-data.service';
import { AuthenticationService } from '../authentication.service';

export class Course {
  _id: string;
  title: string
  lessons: string[]
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {

  constructor(
    private fluentDataService: FluentDataService,
    private authenticationService: AuthenticationService
  ) { }

  public courses: Course[];

  private getCourses(): void {
    this.fluentDataService
      .getCourses()
        .then(foundCourses => this.courses = foundCourses);
  }

  ngOnInit(): void {
    this.getCourses();
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public getUsername(): string {
    const { name } = this.authenticationService.getCurrentUser();
    return name ? name : 'Guest';
  }

}
