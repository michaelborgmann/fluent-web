import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-sidebar',
  templateUrl: './course-sidebar.component.html',
  styleUrls: ['./course-sidebar.component.css']
})
export class CourseSidebarComponent implements OnInit {

  @Input() content: any;

  constructor() { }

  ngOnInit(): void {
    console.log("ID: " + this.content._id);
  }

}
