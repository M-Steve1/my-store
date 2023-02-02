import { Component } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = [];
  productDetail: Product = {
    name: '',
    price: 0,
    url: '',
    description: ''
  }
  hideProductItems: boolean = false;

  constructor(private productService: ProductService, private uiService: UiService, private orderService: OrderService) {
    this.uiService.onHideProduct().subscribe(res => {
      this.hideProductItems = res as boolean;
    })
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    })
  }

  onDblClick(product: Product): void {
    this.productDetail = product;
    this.uiService.hideProduct();
  }

  createOrder(order: Order): void {
    this.orderService.createOrder(order);
  }
}
