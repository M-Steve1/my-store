import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  hideProductItem: boolean = false;
  subject: Subject<unknown> = new Subject();

  constructor() { }

  hideProduct(): void {
    this.hideProductItem = !this.hideProductItem;
    this.subject.next(this.hideProductItem);
  }

  onHideProduct(): Observable<unknown> {
    return this.subject.asObservable();
  }
}
