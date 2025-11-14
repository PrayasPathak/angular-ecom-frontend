import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { SignInParams } from '../../models/user.model';
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [
    MatIconButton,
    MatIcon,
    MatDialogClose,
    MatFormField,
    MatPrefix,
    MatSuffix,
    MatButton,
    MatInput,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in-dialog.html',
  styleUrl: './sign-in-dialog.scss',
})
export class SignInDialog {
  fb = inject(NonNullableFormBuilder);
  passwordVisible = signal(false);
  store = inject(EcommerceStore);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);
  matDialog = inject(MatDialog);

  signInForm = this.fb.group({
    email: ['john@test.com', [Validators.required]],
    password: ['test123', [Validators.required]],
  });

  signIn() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;

    this.store.signIn({
      email,
      password,
      checkout: this.data?.checkout,
      dialogId: this.dialogRef.id,
    } as SignInParams);
  }

  openSignUpDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
      data: { checkout: this.data?.checkout },
    });
  }
}
