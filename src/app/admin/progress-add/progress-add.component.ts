import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-progress-add',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './progress-add.component.html',
  styleUrl: './progress-add.component.scss'
})
export class ProgressAddComponent {
  addNewPlan(formData: any) {
    console.log('Submitted Plan:', formData);
    // handle logic (e.g., send to service or API)
  }
}
