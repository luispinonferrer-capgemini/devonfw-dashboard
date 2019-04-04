import {
    MatSnackBar,
    MatSnackBarConfig,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastService {
    private verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    private delay: number = 5000;

    constructor(private snackbar: MatSnackBar) { }

    public open(message: string, autoclose: boolean, action?: string): void {
        const config = new MatSnackBarConfig();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = autoclose ? this.delay : 0;
        this.snackbar.open(message, action, config);
    }
}