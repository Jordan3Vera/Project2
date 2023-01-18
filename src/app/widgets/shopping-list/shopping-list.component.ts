import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { Product } from '../../types/product.type';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';
import { miObservableDeStrings } from 'src/app/examples/ejemplosRxJS.example';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  shoppingList: Product[] = [];
  suscription: Subscription = new Subscription();

  subject$: Subject<string> = new Subject();
  behaviorSubject$: BehaviorSubject<string> = new BehaviorSubject('por defecto');

  constructor(private shoppingService: ShoppingService) { }

  /**
   * * next => Atributo obligatorio de cualquier observer. Es la funcionalidad que recibe
   * del observable al emitir nuevos valore
   * * error => la funcionalidad opcional que gestiona la notificaciones de error que puede lanzar
   * el observable
   * * completed => la funcionalidad opcional que gestiona la notificación de una ejecución completada
   */

  ngOnInit(): void {
    // * Opción recomendada: Especificar de forma explícita cada uno de los callbacks del observer
    this.suscription = this.shoppingService.getAllProducts().subscribe({
      next: (list: Product[]) => {
        this.shoppingList = list;
      },
      error: (err) => console.error("Ha ocurrido un error al obtener la litsta:" + err),
      complete: () => console.info(`Obtención de lista de productos completada`)
    });

    // Ejemplo de recepción de diferentes valores
    this.shoppingService.getUserData().subscribe({
      next: (valor: string | number) => console.log(`- ${valor}`),
      error: (error: any) => console.log(`Error: ${error}`),
      complete: () => console.info(`¡Hemos terminado!`)
    });

    // * Ejemplo de uso de un Observable personalizado
    miObservableDeStrings('Hola','Martín','¿Qué','Tal?').subscribe({
      next: (valor: string) =>  console.log(`- ${valor}`),
      error: ((err) => console.error(`Ha habido un error: ${err}`)),
      complete: () => console.info(`Fin de emisión de observable personalizado`)
    });

    // * Ejemplo de captura de CLICKS en el documento a través de un observable
    this.shoppingService.getClicks().subscribe({
      next: (valor: string) =>  console.log(`Click ${valor}`),
      error: ((err: any) => console.error(`Ha habido un error: ${err}`)),
      complete: (() => console.info(`Fin de emisión de observable personalizado`))
    });
  }


  ngOnDestroy(): void{
    // Desuscribimos cuando el componente desaparece
    this.suscription.unsubscribe();
  }

}
