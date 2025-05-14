import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-progress-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './progress-edit.component.html',
  styleUrl: './progress-edit.component.scss'
})
export class ProgressEditComponent {
  taskForm!: FormGroup;

  progressId: string | null = null;
  error: string | null = null;
  projectId: string | null = null;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ServiceService) {
    this.taskForm = this.fb.group({
      vendor: ['', Validators.required],
      type: ['', Validators.required],
      payment: ['', Validators.required],
      percentage: ['', Validators.required],
      starts: ['', Validators.required],
      expectedDate: ['', Validators.required],
      remarks: ['']
    });
  }


  ngOnInit(): void {
    // Initialize the form
    this.route.queryParamMap.subscribe(params => {
      this.progressId = params.get('progressId');
      // console.log(this.progressId);
      this.projectId = params.get('projectId');
      console.log(this.projectId);


      if (this.progressId) {
        this.fetchProgress(this.progressId);
      } else {
        this.error = 'Invalid progress ID.';
      }
    });

  }


  fetchProgress(id: string): void {
    const url = `https://backend-sm8m.onrender.com/progress/${id}`;
    this.service.get(url).subscribe({
      next: (response: any) => {
        console.log(response);

        const task = response;
        console.log(task);

        this.taskForm.patchValue({
          vendor: task.vendor,
          type: task.type,
          payment: task.payment,
          percentage: task.percentage,
          starts: task.starts?.substring(0, 10), // trim date if needed
          expectedDate: task.expectedDate?.substring(0, 10),
          remarks: task.remarks,
          // projectId: task.projectId
        });


      },
      error: err => {
        console.error(err);
        this.error = 'Failed to load progress data.';
      }
    });
  }
  onSubmit() {
    if (this.taskForm.invalid || !this.progressId) {
      return;
    }

    const url = `https://backend-sm8m.onrender.com/progress/${this.progressId}`;
    const updatedData = this.taskForm.value;
    console.log(updatedData);
    const requstbody = {
      "vendor": updatedData.vendor,
      "type": updatedData.type,
      "payment": updatedData.payment,
      "percentage": updatedData.percentage,
      "starts": updatedData.starts,
      "expectedDate": updatedData.expectedDate,
      "remarks": updatedData.remarks,
      "projectId": this.projectId



    }

    this.service.put(url, requstbody).subscribe({
      next: (res) => {
        console.log(res);

        alert('Progress updated successfully!');
        this.router.navigate(['/admin/progress/view'], { queryParams: { id: this.projectId } });
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to update progress. Please try again.';
      }
    });
  }
}


// pipe is special type of service .which take input value and return
//  update value of that input value 
