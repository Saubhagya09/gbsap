import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './inventory-add.component.html',
  styleUrl: './inventory-add.component.scss'
})
export class InventoryAddComponent {

  constructor(private http: HttpClient, private router: Router) { }

  addNewInventory(formData: any): void {
    const apiUrl = 'https://backend-sm8m.onrender.com/inventory';

    const payload = {
      itemNo: formData.itemNo,
      materialName: formData.materialName,
      description: formData.description,
      unit: formData.unit,
      quantity: formData.quantity,
      unitPrice: formData.unitPrice,
      supplier: formData.supplier,
      notes: formData.notes
    };

    this.http.post(apiUrl, payload).subscribe({
      next: (response) => {
        console.log('✅ Inventory added:', response);
        alert('✅ Inventory item added successfully!');
        this.router.navigate(['/inventory-list']); // change path as needed
      },
      error: (error) => {
        console.error('❌ Error adding inventory:', error);
        alert('❌ Failed to add inventory item.');
      }
    });
  }
}