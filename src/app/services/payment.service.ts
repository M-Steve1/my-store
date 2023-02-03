import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Payment } from '../models/Payment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl: string = 'http://localhost:8000/payment-details';

  constructor(private http: HttpClient) { }

  addPaymentDetails(paymentDetails: Payment): void {
    this.http.post<Payment>(this.apiUrl, paymentDetails, httpOptions).subscribe();
  }
}
