import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from 'src/app/customValidators';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group(
    {
      username: [
        '',
        [
          Validators.email,
          Validators.maxLength(254),
          Validators.minLength(3),
          Validators.required,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          PasswordValidator.hasLower,
          PasswordValidator.hasNumber,
          PasswordValidator.hasUpper,
          PasswordValidator.hasSymbol,
        ],
      ],
      repeat_password: ['', Validators.required],
    },
    {
      validator: PasswordValidator.MustMatch('password', 'repeat_password'),
    }
  );
  disableSubmit = true;
  constructor(
    private readonly fb: FormBuilder,
    private readonly toastr: ToastService,
    private readonly _auth: AuthService,
    private readonly router: Router
  ) {}

  submitForm() {
    if (this.registerForm.valid) {
      this.disableSubmit = true;
      this._auth.register(this.registerForm.value).subscribe(
        res => {
          this.toastr.showSuccess(
            'Registration Successful, Please login now..'
          );
          this.router.navigate(['auth', 'login']);
        },
        err => {
          console.error(err);
          this.toastr.showError(err.message);
        },
        () => {
          this.disableSubmit = false;
        }
      );
    } else {
      console.log(this.registerForm.controls.username);
    }
  }
  ngOnInit(): void {}
}
