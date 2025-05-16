import { Component } from '@angular/core';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// import { ServiceService } from '../services/service.service';
@Component({
  selector: 'app-vendor-list-view',
  imports: [CommonModule],
  templateUrl: './vendor-list-view.component.html',
  styleUrl: './vendor-list-view.component.scss'
})
export class VendorListViewComponent {
  vendors: any[] = [];
  constructor(private service: ServiceService, private router: Router) { }
  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors() {
    const url = `https://backend-sm8m.onrender.com/vendor`;
    this.service.get(url).subscribe({
      next: (data: any) => {
        console.log(data);

        this.vendors = data;
        console.log('Vendors loaded:', this.vendors);
      },
      error: (error) => {
        console.error('Error loading vendors:', error);
      }
    });
  }

  delete(task: any) {
    console.log(task);
    const confirmed = confirm(`Are you sure you want to delete the task "${task.vendorName}"?`);
    if (!confirmed) return;

    const url = `https://backend-sm8m.onrender.com/vendor/${task._id}`;
    this.service.delete(url).subscribe({
      next: (response: any) => {
        console.log(response.message || 'Task deleted successfully');
        // Update UI by removing deleted task from array
        this.vendors = this.vendors.filter(t => t._id !== task._id);
        alert('Task deleted successfully!');
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert(`Failed to delete task. ${err.error?.error || 'Please try again later.'}`);
      }
    });

  }
  edit(task: any) {
    console.log(task);
    this.router.navigate(["/admin/vendor/edit"], { queryParams: { vendorId: task._id } })

  }
}

