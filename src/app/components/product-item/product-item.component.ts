import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

  onDblClick(product: Product) {
    this.productDetail.emit(product)
  }
}
