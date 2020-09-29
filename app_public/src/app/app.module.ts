import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { FrameworkComponent } from './framework/framework.component';
import { AboutComponent } from './about/about.component';
import { DialogueComponent } from './dialogue/dialogue.component';

@NgModule({
  declarations: [
    LessonsListComponent,
    FrameworkComponent,
    AboutComponent,
    DialogueComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'lesson',
        component: LessonsListComponent
      }, {
        path: 'about',
        component: AboutComponent
      }, {
        path: 'dialogue/:dialogueid',
        component: DialogueComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})

export class AppModule { }
