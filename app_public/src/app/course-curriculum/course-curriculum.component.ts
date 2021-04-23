import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-curriculum',
  templateUrl: './course-curriculum.component.html',
  styleUrls: ['./course-curriculum.component.css']
})
export class CourseCurriculumComponent implements OnInit {

  eventUpdateCounter = 0;

  list = [
    { Caption: 'Dialogue', SortOrder: null, Details: 'Bom dia!' },
    { Caption: 'Lecture', SortOrder: null},
    { Caption: 'Vocabulry', SortOrder: null},
    { Caption: 'Grammar', SortOrder: null},
    { Caption: 'Practice', SortOrder: null},
    { Caption: 'Test', SortOrder: null}
   ]

  constructor() { }

  ngOnInit(): void { }

  public eventOptions = {
    onUpdate: () => this.eventUpdateCounter ++,
    draggable: '.draggable',
    group: 'group'
  };

}
