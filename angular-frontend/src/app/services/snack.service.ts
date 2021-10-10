import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'OK') {
    this._snackBar.open(message, action);
  }
}
