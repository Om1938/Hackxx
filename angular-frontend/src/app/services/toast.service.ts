import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}
  showSuccess(message: string, summary = 'Success') {
    console.log(message + summary);

    this.toastr.success(message, summary);
  }

  showInfo(message: string, summary = 'Info') {
    this.toastr.info(message, summary);
  }

  showWarn(message: string, summary = 'Warning') {
    this.toastr.warning(message, summary);
  }

  showError(message: string, summary = 'Error') {
    this.toastr.error(message, summary);
  }
}
