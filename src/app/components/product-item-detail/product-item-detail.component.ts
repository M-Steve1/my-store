import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { UiService } from 'src/app/services/ui.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private uiService: UiService) {
  }

  gotoProductList(): void {
    this.uiService.hideProduct();
  }
}
