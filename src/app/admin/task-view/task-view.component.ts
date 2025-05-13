import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;
@Component({
  selector: 'app-task-view',
  imports: [CommonModule],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent {
  projectId: string | null = null;
  tasks: any[] = [];
  loading = true;
  error: string | null = null;
  signInModal: any;

  constructor(private route: ActivatedRoute, private service: ServiceService, private router: Router) { }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.projectId = params.get("id")
      console.log(this.projectId)
      if (this.projectId) {
        this.fetchTasksByProject(this.projectId);
      } else {
        console.error('No product ID found in the URL!');
      }

    })
  }


  fetchTasksByProject(id: string): void {
    const url = `https://backend-sm8m.onrender.com/tasks/project/${id}`;
    this.service.get(url).subscribe({
      next: (response: any) => {
        console.log(response);

        this.tasks = response;
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

  edit(task: any) {
    // console.log("dhdg", task.projectId._id);

    this.router.navigate(["/admin/task/edit"], { queryParams: { projectId: task._id } })

  }


  closeModal() {
    // Remove modal backdrop
    const modalBackdrops = document.querySelectorAll('.modal-backdrop');
    modalBackdrops.forEach(backdrop => backdrop.remove());

    // Remove modal-open class to restore page behavior
    document.body.classList.remove('modal-open');

    // Restore scrolling and fix right-side spacing issue
    document.body.style.overflow = "";
    document.body.style.paddingRight = "0px";

    // Hide modal completely
    const modal = document.querySelector('.modal.show') as HTMLElement | null;
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      (modal as HTMLElement).style.display = 'none';
    }
  }




}
