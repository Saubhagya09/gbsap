import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-project-edit',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss'
})
export class ProjectEditComponent {
  projectId: string | null = null;
  projectForm!: FormGroup;

  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private service: ServiceService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.projectId = params.get("id")
      console.log("ghh", this.projectId)
      if (this.projectId) {
        this.fetchProject(this.projectId);
      } else {
        this.error = "No task ID provided.";
      }

    })
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      location: ['', Validators.required],
      typeName: ['', Validators.required]
    });
  }

  fetchProject(id: string): void {
    console.log(id);

    const url = `https://backend-sm8m.onrender.com/projects/${id}`;
    this.service.get(url).subscribe({
      next: (data: any) => {
        console.log(data);

        this.projectForm.patchValue({
          projectName: data.projectName,
          location: data.location,
          typeName: data.typeName
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading project:', err);
        this.error = 'Failed to load project.';
        this.loading = false;
      }
    });
  }

  updateProject(): void {
    if (!this.projectId || this.projectForm.invalid) return
    const url = `https://backend-sm8m.onrender.com/projects/${this.projectId}`;
    // const body = {
    //   projectName: this.project.projectName,
    //   location: this.project.location,
    //   typeName: this.project.typeName
    // };

    this.service.put(url, this.projectForm.value).subscribe({
      next: () => {
        alert('Project updated successfully.');
        this.router.navigate(['/admin/project/view']);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update project.');
      }
    });
  }
}
