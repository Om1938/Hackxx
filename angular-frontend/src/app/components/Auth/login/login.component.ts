import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading!: boolean;
  disableSubmit = true;

  constructor(
    private readonly router: Router,
    private readonly titleService: Title,
    private readonly toastr: ToastService,
    private readonly _auth: AuthService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Login');
    // this.authenticationService.logout();
  }

  login() {
    if (this.loginForm.valid) {
      this.disableSubmit = true;
      this._auth
        .login(this.loginForm.value)
        .pipe(first())
        .subscribe(
          res => {
            this.toastr.showSuccess('Navigated to success ... ');
            this.router.navigate(['student']);
            this.disableSubmit = false;
          },
          err => {
            this.toastr.showError(err.message);
            this.disableSubmit = false;
          }
        );
    } else {
      console.log(this.loginForm.controls.username);
    }
  }

  // resetPassword() {
  //   this.router.navigate(['/auth/password-reset-request']);
  // }
}
