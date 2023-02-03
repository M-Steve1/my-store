import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { UiService } from 'src/app/services/ui.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent {
  faArrowLeft = faArrowLeft;
  @Input() productDetail: Product = {
    name: '',
    price: 0,
    url: '',
    description: ''
  }

  @Input() product: Product = {
    name: '',
    price: 0,
    url: '',
    description: ''
  }
  quantity: number = 1;

  @Output() createOrder: EventEmitter<Order> = new EventEmitter()

  constructor(private uiService: UiService) {
  }

  gotoProductList(): void {
    this.uiService.hideProduct();
  }

  onCreateOrder(product: Product): void {
    const order: Order = {
      productId: product.id as unknown as string,
      quantity: parseInt(this.quantity as unknown as string)
    }

    this.createOrder.emit(order);

    this.quantity = 1;
  }
}
