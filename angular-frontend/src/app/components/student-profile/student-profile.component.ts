import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { ToastService } from 'src/app/services/toast.service';
import { Mode } from '../mode';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent implements OnInit {
  constructor(
    private readonly fb: FormBuilder,
    private readonly _student: StudentService,
    private readonly _toastr: ToastService,
    private readonly _router: Router
  ) {}
  mode = Mode.Display;
  currentYear = new Date().getFullYear();
  years: number[] = [];
  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    college: ['', [Validators.required]],
    year: ['', [Validators.required]],
    branch: ['', [Validators.required]],
  });

  submitButtonTest = 'Submit';
  submitForm() {
    console.log('asdf', this.registerForm.valid, this.registerForm);

    if (this.registerForm.valid) {
      this._student.Create(this.registerForm.value).subscribe(res => {
        // TODO Navigate after creation of student
      });
      this.submitButtonTest = 'Redirect to quiz';
      this.submitForm = () => {
        this._router.navigate(['quiz']);
      };
    }
  }

  ngOnInit(): void {
    for (let index = this.currentYear; index >= 1970; index--) {
      this.years.push(index);
    }
  }
}
