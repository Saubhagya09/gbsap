import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './progress-edit.component.html',
  styleUrl: './progress-edit.component.scss'
})
export class ProgressEditComponent {
  progressId: string | null = null;
  taskForm!: FormGroup;
  loading = true;
  error: string | null = null;
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private service: ServiceService) { }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.progressId = params.get("progressId")
      console.log(this.progressId)
      if (this.progressId) {
        // this.fetchTaskById(this.progressId);
        this.fetchProgressById(this.progressId)
      } else {
        this.error = "No task ID provided.";
      }

    })

    this.taskForm = this.fb.group({
      vendor: ['', Validators.required],
      starts: ['', Validators.required],
      type: ['', Validators.required],
      payment: ['', Validators.required],
      percentage: ['', Validators.required],
      expectedDate: ['', Validators.required],
      remarks: ['', Validators.required],
    });




  }

  fetchProgressById(id: String): void {
    console.log(id);

    const url = `https://backend-sm8m.onrender.com/progress/${id}`;
    this.service.get(url).subscribe({
      next: (data: any) => {
        console.log(data);

        this.taskForm.patchValue({
          vendor: data.vendor,
          starts: data.starts.split('T')[0],
          type: data.type,
          payment: data.payment,
          percentage: data.percentage,
          expectedDate: data.expectedDate.split('T')[0],
          remarks: data.remarks
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch task.';
        console.error(err);
        this.loading = false;
      }
    });
  }


  onSubmit() {
    if (!this.progressId || this.taskForm.invalid) {
      console.warn('Form invalid or missing ID');
      return;
    };
    console.log(this.taskForm.value);


    const updateUrl = ` https://backend-sm8m.onrender.com/progress/${this.progressId}`;
    this.service.put(updateUrl, this.taskForm.value).subscribe({
      next: (res) => {
        console.log(res);

        alert('Task updated successfully!');
        this.router.navigate(['/admin/progress/view'], {
          queryParams: { id: res.projectId }
        });
      },
      error: (err) => {
        this.error = 'Failed to update task.';
        console.error(err);
      }
    });
  }
}

// pipe is special type of service .which take input value and return
//  update value of that input value 
