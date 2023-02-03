import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Payment } from 'src/app/models/Payment';
import { ProductsInCart } from 'src/app/models/ProductsInCart';
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
  productsInCart: ProductsInCart[] = [];
  totalPrice: number = 0;
  fullName: string = '';
  address: string = '';
  cardNumber: string = '';
  updateProductQuantity: number = 0;

  constructor(private orderService: OrderService, private productService: ProductService, private paymentService: PaymentService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(res => {
      this.orders = res;
      for (let i= 0; i < this.orders.length; i++) {
        const productId = this.orders[i].productId
        this.productService.getProductById(productId).subscribe(product => {
          product['quantity'] = this.orders[i].quantity;
          product['orderId'] = this.orders[i].id;
          this.productsInCart.push(product);
          this.totalPrice += (product.price * product.quantity);
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

  updateQuantity(orderId: number | unknown, quantity: number | unknown, productId: number | unknown, productPrice: number): void {
    const order: Order = {
      productId: productId as unknown as string,
      quantity: quantity as unknown as number
    }
    this.orderService.updateOrder(orderId as unknown as number, order);
    this.totalPrice += productPrice;
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