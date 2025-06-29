import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormArray,ReactiveFormsModule,Validators } from '@angular/forms';
import { ServiceService } from '../../service.service';
@Component({
  selector: 'app-purches-bill',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './purches-bill.component.html',
  styleUrl: './purches-bill.component.scss'
})
export class PurchesBillComponent implements OnInit{
    PurchaseForm!: FormGroup;
  totalAmount: any;
  gstRates: number[] = [0, 2.5, 6, 9, 14];
  constructor(private fb: FormBuilder, private service: ServiceService) { }

  ngOnInit(): void {
  this.PurchaseForm = this.fb.group({
  invoiceNumber: ['', Validators.required],
  invoiceDate: [new Date().toISOString().substring(0, 10), Validators.required],
  supplierName: ['', Validators.required], // ← Add this
  supplierGST: ['', Validators.required],   // ← Add this
  billTo: this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
  }),
  shipTo: this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
  }),
  items: this.fb.array([this.createItem()]),
  cgstPercent: ['', [Validators.required, Validators.min(0)]],
  sgstPercent: ['', [Validators.required, Validators.min(0)]],
  paymentMode: [''],
  bankName: [''],
  accountNumber: [''],
  ifscCode: [''],
});

  }

  // Getter for items FormArray
  get items(): FormArray {
    return this.PurchaseForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      hsn: ['', Validators.required],
      qty: [1, [Validators.required, Validators.min(1)]],
      rate: ['', [Validators.required, Validators.min(0)]],
      discount: [''],
      total: [''], // will be recalculated server-side
    });
  }

  addItem() {
    this.items.push(this.createItem());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  submitBill() {
    if (this.PurchaseForm.invalid) {
      this.PurchaseForm.markAllAsTouched();
      return;
    }

    // Prepare data for backend
    const payload = this.PurchaseForm.value;
    // Ensure items[].total = 0 (backend recalculates)
    payload.items = payload.items.map((item: any) => ({ ...item, total: 0 }));

    this.service.post('https://backend-sm8m.onrender.com/purchase', payload).subscribe({
      next: (res) => {
        console.log('Invoice saved successfully', res);
        console.log('Invoice saved successfully', res._id);

        this.getInvoiceTotamount(res._id)


        alert('Invoice submitted successfully!');
        // this.sellForm.reset({
        //   invoiceDate: new Date().toISOString().substring(0, 10),
        //   cgstPercent: 9,
        //   sgstPercent: 9,
        //   modeOfPayment: 'Cash',
        //   items: [this.createItem().value],
        // });
      },
      error: (err) => {
        console.error('Error submitting invoice:', err);
        alert('Failed to submit invoice. Please try again.');
      },
    });
  }
  getInvoiceTotamount(id: any) {
    console.log(id);

    const url = `https://backend-sm8m.onrender.com/purchase/${id}`;

    this.service.get(url).subscribe({
      next: (invoice: any) => {
        console.log('Fetched invoice:', invoice);
        this.totalAmount = invoice.totalAmount
        console.log(this.totalAmount);


        // alert(Total invoice amount: ${totalAmount});
      },
      error: (err) => {
        console.error('Failed to fetch invoice:', err);
        alert('Could not fetch invoice details.');
      }
    });
  }

}
