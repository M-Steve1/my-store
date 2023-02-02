import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

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

  constructor(private orderService: OrderService, private productService: ProductService) {}

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
}
