import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from 'src/app/_forms/text-input/text-input.component';
import { Client } from 'src/app/_models/client';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TextInputComponent,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private toastrService = inject(ToastrService);
  private router = inject(Router);
  @Output() cancelRegister = new EventEmitter();
  validationErrors: string[] = [];

  registerForm = this.fb.group({
    displayName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: (res: Client) => {
        console.log('Response received:', res);
        this.accountService.setCurrentUser(res);
        this.router.navigateByUrl(`account/${res.id}`);
      },
      error: (err) => {
        console.error('Ocorreu um erro:', err);
        this.validationErrors = err.error.errors;
        this.toastrService.error(err.error.errors);
      }
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
