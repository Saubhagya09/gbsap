import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';
// import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-quotation-bill',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './quotation-bill.component.html',
  styleUrls: ['./quotation-bill.component.scss'],
})
export class QuotationBillComponent implements OnInit {
  quotationForm!: FormGroup;
  totalAmount: any;
  gstRates: number[] = [0, 2.5, 6, 9, 14];
  constructor(private fb: FormBuilder, private service: ServiceService) { }

  ngOnInit(): void {
    this.quotationForm = this.fb.group({
      // quotationNumber: [''],
      quotationDate: [new Date().toISOString().substring(0, 10), Validators.required],
        // quotationValue: [''],
        // customerName: ['', ],
        // customerGST	:['',],
      // vendorName: ['', Validators.required],
      // vendorGST: ['', Validators.required],
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
      modeOfPayment: [''],
      bankName: [''],
      accountNumber: [''],
      ifscCode: [''],
    });
  }

  // Getter for items FormArray
  get items(): FormArray {
    return this.quotationForm.get('items') as FormArray;
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

  submitQuotation() {
    if (this.quotationForm.invalid) {
      this.quotationForm.markAllAsTouched();
      return;
    }

    // Prepare data for backend
    const payload = this.quotationForm.value;
    // Ensure items[].total = 0 (backend recalculates)
    payload.items = payload.items.map((item: any) => ({ ...item, total: 0 }));

    this.service.post('https://backend-sm8m.onrender.com/quation', payload).subscribe({
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

    const url = `https://backend-sm8m.onrender.com/quation/${id}`;

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