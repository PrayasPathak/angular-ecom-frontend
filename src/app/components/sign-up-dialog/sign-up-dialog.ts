import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { SignUpParams } from '../../models/user.model';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    MatIcon,
    MatIconButton,
    MatDialogClose,
    MatFormField,
    ReactiveFormsModule,
    MatPrefix,
    MatSuffix,
    MatButton,
    MatInput,
  ],
  templateUrl: './sign-up-dialog.html',
  styleUrl: './sign-up-dialog.scss',
})
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder);
  passwordVisible = signal(false);
  store = inject(EcommerceStore);
  dialogRef = inject(MatDialogRef);
  matDialog = inject(MatDialog);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  signUpForm = this.fb.group({
    name: ['John Doe', [Validators.required]],
    email: ['john@test.com', [Validators.required]],
    password: ['john123', [Validators.required]],
    confirmPassword: ['john123', [Validators.required]],
  });

  signUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.signUpForm.value;

    this.store.signUp({
      name,
      email,
      password,
      dialogId: this.dialogRef.id,
      checkout: this.data?.checkout,
    } as SignUpParams);
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, {
      data: {
        checkout: this.data?.checkout,
      },
    });
  }
}
