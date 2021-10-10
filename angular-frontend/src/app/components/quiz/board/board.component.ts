import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Question } from '../main/question';
import { Quiz } from '../quiz';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, AfterViewInit {
  @Input() questions!: Quiz[];
  selectedQuestion!: Quiz;
  showQuestion = false;
  selectedIndex = 0;
  constructor() {}
  ngAfterViewInit(): void {}
  openQuestion(question: Quiz, i: number) {
    this.showQuestion = false;
    this.selectedQuestion = question;
    this.selectedIndex = i;
    this.showQuestion = true;
  }

  changeRadio(e: MatRadioChange) {
    this.selectedQuestion.selectedOption = e.value;
  }

  ngOnInit(): void {
    if (this.questions.length > 0) {
      this.selectedQuestion = this.questions[0];
      this.showQuestion = true;
    }
  }
  next() {
    if (this.selectedIndex < this.questions.length - 1) {
      this.selectedQuestion = this.questions[++this.selectedIndex];
    }
  }
  previous() {
    if (this.selectedIndex > 0) {
      this.selectedQuestion = this.questions[--this.selectedIndex];
    }
  }
}
