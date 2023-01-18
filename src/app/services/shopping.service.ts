import { Injectable } from '@angular/core';

// Importaciones de RXJS
import { Observable, of, fromEvent } from 'rxjs';
import { Product } from '../types/product.type';
import { PRODUCT_LIST } from '../mocks/product.mock';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor() { }

  getUserData(): Observable<string | number>{
    return of('Hola','Martín',30);
  }

  getAllProducts(): Observable<Product[]>{
    return of(PRODUCT_LIST);
  }

  getClicks(): Observable<any>{
    return fromEvent(document, 'click');
  }
}
