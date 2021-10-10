import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Quiz } from '../components/quiz/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private readonly _http: HttpClient) {}

  getQuestions(): Observable<Quiz[]> {
    const questionURL = environment.serverUrl + 'Test';
    return this._http.get<Quiz[]>(`${questionURL}/GetQuestionsAndOptions`);
  }
  submit(
    answers: {
      questionid: number;
      optionid:
        | import('../components/quiz/selectedOption').selectedOption
        | undefined;
    }[]
  ) {
    const submitURL = environment.serverUrl + 'UserDashboard';
    return this._http.post(`${submitURL}/GetUserMarks`, answers);
  }
}
