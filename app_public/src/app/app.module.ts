import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LessonsListComponent } from './lessons-list/lessons-list.component';

@NgModule({
  declarations: [
    LessonsListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [LessonsListComponent]
})
export class AppModule { }
