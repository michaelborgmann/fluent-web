import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SortablejsModule } from 'ngx-sortablejs'

import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { FrameworkComponent } from './framework/framework.component';
import { AboutComponent } from './about/about.component';
import { DialogueComponent } from './dialogue/dialogue.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { SettingsComponent } from './settings/settings.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseSidebarComponent } from './course-sidebar/course-sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { CourseCurriculumComponent } from './course-curriculum/course-curriculum.component';

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
    CourseEditComponent,
    CourseSidebarComponent,
    FooterComponent,
    CourseCurriculumComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SortablejsModule.forRoot({}),
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
        path: 'courses/edit/:courseId',
        component: CourseEditComponent,
        children: [
          {
            path: 'curriculum',
            component: CourseCurriculumComponent
          }
        ],
      }
    ])
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})

export class AppModule { }
