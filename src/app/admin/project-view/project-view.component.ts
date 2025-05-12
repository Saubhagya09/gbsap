import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';
@Component({
  selector: 'app-project-view',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.scss'
})
export class ProjectViewComponent {
  projects: any[] = [];
  projectId: string | null = null;
  tasks: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient, private router: Router, private service: ServiceService) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  // Fetch all projects
  fetchProjects(): void {
    this.http.get<any[]>('https://backend-sm8m.onrender.com/projects')
      .subscribe({
        next: (data) => {

          this.projects = data.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        },
        error: (err) => {
          console.error('Failed to fetch projects:', err);
          alert('Error loading projects. Please try again later.');
        }
      });
  }

  // Delete a project by ID
  deleteProject(projectId: string): void {
    const confirmation = confirm('Are you sure you want to delete this project?');
    if (!confirmation) return;

    const apiUrl = `https://backend-sm8m.onrender.com/projects/${projectId}`;

    this.http.delete<{ message: string }>(apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error deleting project:', error);
          if (error.error?.details) {
            alert(`Failed to delete the project: ${error.error.details}`);
          } else {
            alert('Failed to delete the project. Please try again later.');
          }
          return of(null); // Continue gracefully
        })
      )
      .subscribe((response) => {
        if (response && response.message === 'Project deleted successfully') {
          this.projects = this.projects.filter(p => p._id !== projectId);
          alert('Project deleted successfully.');
        }
      });
  }


  // View tasks associated with a project
  task_view(id: any) {

    const url = `https://backend-sm8m.onrender.com/tasks/project/${id}`;
    this.service.get(url).subscribe({
      next: (response: any) => {
        console.log(response);

        this.router.navigate(['/admin/task/view'], { queryParams: { id: id } });



      },


      error: (err) => {
        this.error = 'Failed to load tasks. Please try again later.';
        console.error('API error:', err);
        this.loading = false;
        if (err.status === 404 && err.error?.error === 'No tasks found for this project') {
          const confirmAdd = confirm('No tasks found. Do you want to add a task?');
          if (confirmAdd) {
            this.router.navigate(['/admin/task/add'], { queryParams: { id: id } });
          } else {
            this.error = 'Failed to load tasks. Please try again later.';
          }
        }
      }
    });
  }


  progress_view(id: any) {
    const url = `https://backend-sm8m.onrender.com/progress/project/${id}`;
    this.service.get(url).subscribe({
      next: (response: any) => {
        console.log(response);

        this.router.navigate(['/admin/progress/view'], { queryParams: { id: id } });



      },


      error: (err) => {
        console.log(err);

        this.error = 'Failed to load tasks. Please try again later.';
        console.error('API error:', err);
        this.loading = false;
        if (err.status === 404 && err.error?.error === "No progress found for this project") {
          const confirmAdd = confirm('No progress found. Do you want to add a progress?');
          if (confirmAdd) {
            this.router.navigate(['/admin/progress/add'], { queryParams: { id: id } });
          } else {
            this.error = 'Failed to load progress. Please try again later.';
          }
        }
      }
    });
  }

  materail_view(id: any) {

  }

  // this.router.navigate(['/admin/task/view'], { queryParams: { id: project._id } });

  task_add(id: any) {
    // console.log(id);
    this.router.navigate(['/admin/task/add'], { queryParams: { id: id } });

  }
  progress_add(id: any) {
    console.log(id);
    this.router.navigate(['/admin/progress/add'], { queryParams: { id: id } });

  }
  material_add(id: any) {
    console.log(id);
    this.router.navigate(['/admin/material/add'], { queryParams: { id: id } });

  }


}


function fetchTasksByProject(project: any) {
  throw new Error('Function not implemented.');
}

