import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Order } from '../models/Order';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl: string = 'http://localhost:8000/orders';

  constructor(private http: HttpClient) { }

  createOrder(order: Order): void {
    this.http.post<Order>(this.apiUrl, order, httpOptions).subscribe();
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
}
