import { Component, OnInit } from '@angular/core';

export class Message {
  type: string;
  user: string
  original: string;
  translation: string;
  audio: string
  notes: string[];
}

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.pug',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {

  public messages: Message[] = [
    {
      type: "title",
      original: "A casa do Mitch",
      translation: "Das Haus des Mitch"
    }, {
      type: "message",
      user: "mitch",
      original: "Bom-dia!",
      translation: "Guten Tag!"
    }, {
      type: "message",
      user: "yolanda",
      original: "Tudo bem?",
      translation: "Wie geht's?"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
