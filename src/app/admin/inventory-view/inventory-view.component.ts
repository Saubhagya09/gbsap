import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-inventory-view',
  imports: [CommonModule, HttpClientModule, MatProgressSpinnerModule,],
  templateUrl: './inventory-view.component.html',
  styleUrl: './inventory-view.component.scss'
})
export class InventoryViewComponent {
  tasks: any[] = []; // Array to store inventory items
  loading: boolean = false; // To handle loading state
  errorMessage: string = ''; // To handle error state

  private baseUrl = 'https://backend-sm8m.onrender.com/inventory'; // API URL for inventory items

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchInventoryItems(); // Fetch inventory items on component initialization
  }

  // Fetch all inventory items
  fetchInventoryItems(): void {
    this.loading = true; // Start loading
    this.errorMessage = ''; // Reset error message

    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (data) => {
        console.log(data);

        this.tasks = data; // Store fetched data in tasks
        this.loading = false; // Stop loading
      },
      error: (err) => {
        console.error('Error fetching inventory items:', err);
        this.errorMessage = 'Failed to load inventory items. Please try again later.'; // Display error message
        this.loading = false; // Stop loading
      }
    });
  }

  deleteInventory(id: string, index: number): void {
    const confirmed = confirm('Are you sure you want to delete this inventory item?');
    if (!confirmed) return;

    this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error deleting inventory item:', error);
          this.errorMessage = 'Failed to delete the item. It may not exist.';
          return of(null); // Return observable so stream continues
        })
      )
      .subscribe((response) => {
        if (response) {
          // Remove item from UI
          this.tasks.splice(index, 1);
          alert('Inventory item deleted successfully');
        }
      });
  }
  editInventory(inventory: any) {
    console.log(inventory);
    this.router.navigate(['/admin/inventory/edit'], { queryParams: { id: inventory._id } });

  }

}