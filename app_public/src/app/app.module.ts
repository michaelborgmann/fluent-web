import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { FrameworkComponent } from './framework/framework.component';
import { AboutComponent } from './about/about.component';
import { DialogueComponent } from './dialogue/dialogue.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { SettingsComponent } from './settings/settings.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseSidebarComponent } from './course-sidebar/course-sidebar.component';

@NgModule({
  declarations: [
    LessonsListComponent,
    FrameworkComponent,
    AboutComponent,
    DialogueComponent,
    RegisterComponent,
    LoginComponent,
    CoursesComponent,
    SettingsComponent,
    CourseCreateComponent,
    CourseSidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: CoursesComponent
      }, {
        path: 'courses/:courseId',
        component: LessonsListComponent
      }, {
        path: 'lesson',
        component: LessonsListComponent
      }, {
        path: 'about',
        component: AboutComponent
      }, {
        path: 'dialogue/:dialogueId',
        component: DialogueComponent
      }, {
        path: 'register',
        component: RegisterComponent
      }, {
        path: 'login',
        component: LoginComponent
      }, {
        path: 'settings',
        component: SettingsComponent
      }, {
        path: 'course-create',
        component: CourseCreateComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})

export class AppModule { }
