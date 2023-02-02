import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product = {
    name: '',
    price: 0,
    url: '',
    description: ''
  }
  @Output() productDetail: EventEmitter<Product> = new EventEmitter();
  @Output() createOrder: EventEmitter<Order> = new EventEmitter();
  quantity: number = 1;

  constructor() {}

  onDblClick(product: Product) {
    this.productDetail.emit(product)
  }

  onCreateOrder(product: Product) {
    const order: Order = {
      productId: product.id as unknown as string,
      quantity: parseInt(this.quantity as unknown as string)
    }

    this.createOrder.emit(order);
    this.quantity = 1
  }
}
