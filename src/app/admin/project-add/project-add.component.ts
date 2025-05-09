import { Component } from '@angular/core';
// import { ProjectService } from '../service.service'; // Adjust the path as needed
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';
@Component({
  selector: 'app-project-add',
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule],
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
      next: (response) => {



        alert('✅ Project created successfully!');
        this.router.navigate(["/admin/project/view"])
      },
      error: (error) => {
        console.error('Error creating project:', error);
        alert('❌ Failed to create project.');
      }
    });
  }
}
