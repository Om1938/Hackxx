import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, timer } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { QuizService } from 'src/app/services/quiz.service';
import { ToastService } from 'src/app/services/toast.service';
import { Quiz } from '../quiz';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(
    private readonly _service: QuizService,
    private readonly _toastr: ToastService,
    private readonly _router: Router
  ) {}

  quizs: Quiz[] = [];
  categorizedquizs: { category: string; questions: Quiz[] }[] = [];

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this._service.getQuestions().subscribe(res => {
      this.quizs = res;
      const questions = this.groupBy(res, 'category');

      const arr = [];
      for (const key in questions) {
        if (questions.hasOwnProperty(key)) {
          arr.push({ category: key, questions: questions[key] });
        }
      }
      this.categorizedquizs = arr;
    });
  }

  groupBy = (xs: any, key: any) => {
    return xs.reduce(function (acc: any, x: any) {
      (acc[x[key]] = acc[x[key]] || []).push(x);
      return acc;
    }, {});
  };

  Submit() {
    const answers = this.quizs.map(quiz => {
      return { questionid: quiz.id, optionid: quiz.selectedOption };
    });
    this._service.submit(answers).subscribe(res => {
      this._toastr.showSuccess('Submitted Ansewers Successfully.');
      this._router.navigate(['']);
    });
  }
}
