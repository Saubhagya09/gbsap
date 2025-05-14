import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';
import { skip } from 'rxjs';
@Component({
  selector: 'app-progress-view',
  imports: [CommonModule],
  templateUrl: './progress-view.component.html',
  styleUrl: './progress-view.component.scss'
})
export class ProgressViewComponent {
  projectId: string | null = null;
  progress: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private service: ServiceService, private router: Router) {

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.projectId = params.get("id")
      console.log("project", this.projectId)
      if (this.projectId) {
        this.fetchProgressByProject(this.projectId);
      } else {
        console.error('No process ID found in the URL!');
      }

    })
  }

  // Called when "Create" button is clicked
  fetchProgressByProject(id: string): void {
    const url = `https://backend-sm8m.onrender.com/progress/project/${id}`;
    this.service.get(url).subscribe({
      next: (response: any) => {
        console.log(response);

        // this.tasks = response;

        // Map response.data to extract percentage and type
        this.progress = response.data.map((task: any) => ({
          id: task._id,
          type: task.type,
          percentage: task.percentage,
          payment: task.payment,
          expectedDate: task.expectedDate,
          starts: task.starts,
          remarks: task.remarks,
          vendor: task.vendor,
          projectId: task.projectId._id


        }));
        this.loading = false;
        console.log(this.progress)
      },


      error: (err) => {
        this.error = 'Failed to load tasks. Please try again later.';
        console.error('API error:', err);
        this.loading = false;
        if (err.status === 404 && err.error?.error === 'No tasks found for this project') {
          const confirmAdd = confirm('No tasks found. Do you want to add a task?');
          if (confirmAdd) {
            this.router.navigate(['/admin/task/add'], { queryParams: { projectId: id } });
          } else {
            this.error = 'Failed to load tasks. Please try again later.';
          }
        }
      }
    });
  }
  edit(progress: any) {
    console.log("progress", progress);
    const progressId = progress.id   //////issue
    console.log("progress", progressId);
    const projectId = progress.projectId
    console.log("project", projectId);


    this.router.navigate(["/admin/progress/edit"], { queryParams: { progressId: progressId, projectId: projectId } })

  }
  progress_delete(progress: any) {
    console.log(progress);
    const confirmed = confirm(`Are you sure you want to delete the task "${progress.type}"?`);
    if (!confirmed) return;

    const url = `https://backend-sm8m.onrender.com/progress/${progress.id}`;
    this.service.delete(url).subscribe({
      next: (response: any) => {
        console.log(response.message || 'progress deleted successfully');
        // Update UI by removing deleted task from array
        this.progress = this.progress.filter(t => t.id !== progress.id);
        alert('Task deleted successfully!');
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert(`Failed to delete progress. ${err.error?.error || 'Please try again later.'}`);
      }
    });
  }
}

