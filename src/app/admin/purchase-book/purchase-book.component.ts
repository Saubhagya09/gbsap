import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase-book',
  imports: [CommonModule],
  templateUrl: './purchase-book.component.html',
  styleUrl: './purchase-book.component.scss'
})
export class PurchaseBookComponent implements OnInit {
     purchaseInvoices: any[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getSellInvoices();
  }

  getSellInvoices(): void {
    const url = 'https://backend-sm8m.onrender.com/purchase';
    this.service.get(url).subscribe({
      next: (data: any) => {
        console.log(data);

        this.purchaseInvoices = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load sell invoices.';
        console.error(err);
        this.loading = false;
      }
    });
  }
  delete(id: any) {
    console.log(id);
    if (confirm('Are you sure you want to delete this invoice?')) {
      const url = `https://backend-sm8m.onrender.com/purchase/${id}`;
      this.service.delete(url).subscribe({
        next: () => {
          // Remove deleted invoice from list
          this.purchaseInvoices = this.purchaseInvoices.filter(invoice => invoice._id !== id);
          alert('Invoice deleted successfully.');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to delete invoice.');
        }
      });
    }
  }
  // pdf_download(id: any) {
  //   console.log(id);

  // }

  pdf_download(id: string) {
    const url = `https://backend-sm8m.onrender.com/purchase/pdf/${id}`;

    this.service.downloadPDF(url).subscribe({
      next: (blob) => {
        console.log(blob);

        // Create a blob URL for the PDF
        const fileURL = window.URL.createObjectURL(blob);
        console.log(fileURL);

        // Create a temporary anchor element to trigger download
        const a = document.createElement('a');
        a.href = fileURL;

        // You can customize the filename here, e.g. invoice_<id>.pdf
        a.download = `invoice_${id}.pdf`;

        document.body.appendChild(a);
        a.click();

        // Clean up
        document.body.removeChild(a);
        window.URL.revokeObjectURL(fileURL);
      },
      error: (err) => {
        console.error('PDF download failed:', err);
        alert('Failed to download PDF invoice. Please try again.');
      }
    });
  }

}
