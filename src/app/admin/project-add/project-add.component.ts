import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ServiceService } from '../../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-add',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './project-add.component.html',
  styleUrl: './project-add.component.scss'
})
export class ProjectAddComponent {
  newProject: any = {}; // Property to bind to the form
  constructor(private http: HttpClient, private projectService: ServiceService, private router: Router,) { }

  // Method to handle form submission and make the API request
  addNewPlan(formData: any): void {
    const apiUrl = 'https://backend-sm8m.onrender.com/projects'; // Your API URL

    const payload = {
      projectName: formData.subscriptionName,
      location: formData.location,
      typeName: formData.tasktype
    };

    // HTTP POST request using HttpClient (with fetch enabled)
    this.http.post(apiUrl, payload).subscribe({
      next: (response: any) => {



        alert('✅ Project created successfully!');
        this.router.navigate(["/admin/project/view"])
      },
      error: (error: any) => {
        console.error('Error creating project:', error);
        alert('❌ Failed to create project.');
      }
    });
  }
}