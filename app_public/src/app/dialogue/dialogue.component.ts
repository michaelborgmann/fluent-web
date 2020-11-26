import { Component, OnInit } from '@angular/core';
import { FluentDataService } from '../fluent-data.service';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

export class Message {
  type: string;
  sender: string;
  target: string;
  source: string;
  //audio: string
  //notes: string[];
}

export class Dialogue {
  _id: string;
  targetLanguage: string;
  sourceLanguage: string;
  messages: Message[];
}

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {

  constructor(
    private fluentDataService: FluentDataService,
    private route: ActivatedRoute
  ) { }

  public dialogue: Dialogue;

  /*
  private getDialogue(dialogueId: string): void {
    this.fluentDataService
      .getDialogue(dialogueId)
        .then(foundDialogue => this.dialogue = foundDialogue);
  }
  */

  ngOnInit(): void {

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let dialogueId = params.get('dialogueId');
          return this.fluentDataService.getDialogue(dialogueId);
        })
      ).subscribe((newDialoge: Dialogue) => {
          this.dialogue = newDialoge;
      });

  }

}
