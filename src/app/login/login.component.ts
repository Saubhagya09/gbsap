import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { mobile, code } = this.loginForm.value;
    const apiUrl = 'https://backend-sm8m.onrender.com/login'; // Replace with your actual login API

    this.http.post(apiUrl, { mobile, code }).subscribe({
      next: (res: any) => {
        console.log('✅ Login successful:', res);

        // Optionally store token in localStorage/sessionStorage
        // localStorage.setItem('token', res.token);

        this.router.navigateByUrl('/admin/dashboard');
      },
      error: (err) => {
        console.error('❌ Login failed:', err);
        this.errorMessage = 'Invalid mobile number or verification code.';
      }
    });
  }
}