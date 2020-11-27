import { Component, OnInit } from '@angular/core';
import { FluentDataService } from '../fluent-data.service';
import { AuthenticationService } from '../authentication.service';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

export class Lesson {
  _id: string;
  title: string;
  translation: string;
  imageURL: string;
  dialogue: string;
}

export class CoursePopulated {
  _id: string
  title: string;
  lessons: Lesson[];
}

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})

export class LessonsListComponent implements OnInit {

  constructor(
    private fluentDataService: FluentDataService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  public course: CoursePopulated;

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let courseId = params.get('courseId');
          return this.fluentDataService.getCourse(courseId);
        })
      ).subscribe((newCourse: CoursePopulated) => {
          this.course = newCourse;
      });
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public getUsername(): string {
    const { name } = this.authenticationService.getCurrentUser();
    return name ? name : 'Guest';
  }

}
