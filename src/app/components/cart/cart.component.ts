import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Payment } from 'src/app/models/Payment';
import { Product } from 'src/app/models/Product';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orders: Order[] = []
  productsInCart: Product[] = [];
  totalPrice: number = 0;
  fullName: string = '';
  address: string = '';
  cardNumber: string = '';

  constructor(private orderService: OrderService, private productService: ProductService, private paymentService: PaymentService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(res => {
      this.orders = res;
      for (let i= 0; i < this.orders.length; i++) {
        const productId = this.orders[i].productId
        this.productService.getProductById(productId).subscribe(product => {
          product['quantity'] = this.orders[i].quantity
          this.productsInCart.push(product);
          this.totalPrice += product.price;
        })
      }
    })
  }

  navigate(): void {
    this.router.navigate(['confirmation'], 
    {
      state: {fullName: this.fullName, totalPrice: this.totalPrice}
    })
  }

  addPaymentDetails(): void {
    const paymentDetails: Payment = {
      fullName: this.fullName,
      address: this.address,
      cardNumber: this.cardNumber
    }

    this.paymentService.addPaymentDetails(paymentDetails);

    this.fullName = '';
    this.address = '';
    this.cardNumber = '';
  }

  clearCart(): void {
    for (let i = 0; i < this.orders.length; i++) {
      const orderId = this.orders[i].id as unknown as number;
      this.orderService.deleteOrder(orderId)
    }
    this.orders = [];
    this.productsInCart = [];
  }
}