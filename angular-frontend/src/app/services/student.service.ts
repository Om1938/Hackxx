import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  studentURL = environment.serverUrl + 'student';

  Create(value: any) {
    return this._http.post(this.studentURL, value);
  }

  constructor(private readonly _http: HttpClient) {}
}
