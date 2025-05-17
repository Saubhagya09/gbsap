import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employment-view',
  imports: [MatProgressSpinnerModule, CommonModule, HttpClientModule],
  templateUrl: './employment-view.component.html',
  styleUrl: './employment-view.component.scss'
})
export class EmploymentViewComponent {

  users: any[] = []; // Array to store inventory items
  loading: boolean = false; // To handle loading state
  errorMessage: string = ''; // To handle error state

  private baseUrl = 'https://backend-sm8m.onrender.com/employee'; // API URL for inventory items

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchEmployeeItems(); // Fetch inventory items on component initialization
  }

  // Fetch all inventory items
  fetchEmployeeItems(): void {
    this.loading = true; // Start loading
    this.errorMessage = ''; // Reset error message

    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (data) => {
        console.log(data);

        this.users = data; // Store fetched data in tasks
        this.loading = false; // Stop loading
      },
      error: (err) => {
        console.error('Error fetching User Details:', err);
        this.errorMessage = 'Failed to load User Details. Please try again later.'; // Display error message
        this.loading = false; // Stop loading
      }
    });
  }

  deleteUser(id: string, index: number): void {
    const confirmed = confirm('Are you sure you want to delete this User Details?');
    if (!confirmed) return;

    this.http.delete<{ message: string }>(`${this.baseUrl} / ${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error deleting User Details:', error);
          this.errorMessage = 'Failed to delete the item. It may not exist.';
          return of(null); // Return observable so stream continues
        })
      )
      .subscribe((response) => {
        if (response) {
          // Remove item from UI
          this.users.splice(index, 1);
          alert('User Details deleted successfully');
        }
      });
  }
  editUser(employee: any) {
    console.log(employee);
    this.router.navigate(['/admin/employment/edit'], { queryParams: { id: employee._id } });

  }

}