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
  progressId: string | null = null;
  tasks: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private service: ServiceService, private router: Router) {

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.progressId = params.get("id")
      console.log(this.progressId)
      if (this.progressId) {
        this.fetchProgressByProject(this.progressId);
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
        this.tasks = response.data.map((task: any) => ({
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
        console.log(this.tasks)
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
    console.log("dhdg", progress);
    const progressId = progress.id
    console.log(progressId);
    const projectId = progress.projectId
    console.log(projectId);


    this.router.navigate(["/admin/progress/edit"], { queryParams: { progressId: progressId, projectId: projectId } })

  }
}
