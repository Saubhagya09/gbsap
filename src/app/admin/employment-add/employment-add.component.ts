import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-employment-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './employment-add.component.html',
  styleUrls: ['./employment-add.component.scss']
})
export class EmploymentAddComponent {
  private apiUrl = 'https://backend-sm8m.onrender.com/employee';

  constructor(private http: HttpClient) { }

  addNewEmployee(formData: {
    name: string;
    contactNumber: string;
    email: string;
    role?: string;
    department?: string;
  }) {
    this.http.post(this.apiUrl, formData).subscribe({
      next: (response) => {
        console.log('Employee created successfully:', response);
        alert('Employee added successfully!');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding employee:', error);
        alert(error.error?.error || 'Failed to add employee. Please try again.');
      }
    });
  }
}