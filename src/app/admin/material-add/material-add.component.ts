import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-material-add',
  imports: [FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './material-add.component.html',
  styleUrl: './material-add.component.scss'
})
export class MaterialAddComponent {
  addMaterialEntry(formData: any) {
    // You can access form values like formData.date, formData.materialName, etc.
    console.log("Form Submitted", formData);
  }
}
