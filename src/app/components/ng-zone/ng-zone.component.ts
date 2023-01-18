import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-ng-zone',
  templateUrl: './ng-zone.component.html',
  styleUrls: ['./ng-zone.component.scss']
})
export class NgZoneComponent implements OnInit {

  progreso: number = 0; //Valor que va a ir de 0% a 100%
  texto: string = ''; //Dentro / Fuera de Angular Zone

  constructor(private _ngZone: NgZone) { }

  ngOnInit(): void {
  }

  /**
   * Método para incrementar de 0 a 100 el valor de progreso
   * @param terminar Callback que s eejecuta al terminar el incremento
   */

  incrementarProgreso(terminar: () => void){
    this.progreso += 1; //incrementamos el progreso
    console.log(`Progreso actual: ${this.progreso}%`)

    if(this.progreso < 100 ){
      window.setTimeout(() => {
        this.incrementarProgreso(terminar); //recursividad para seguir incrementado
      },10);
    }else{
      // ya habría terminado de incrementarse
      // ejecutamos el click
      terminar();
    }
  }

  /**
   * Método que aumenta el prograso
   * dentro de NgZone
   * Implica que los cambios se ven en el HTML
   */
  aumentarDentroNgZone(){
    this.texto = 'DENTRO';
    this.progreso = 0; //lo reseteamos para la ejecución
    this.incrementarProgreso(
      () => console.log(`${this.texto} de Angular Zone: Incremento terminado`)
    );
  }


  /**
   * Método que aumenta el prograso
   * fuera de NgZone
   * Implica que los cambios no se van a ver en el HTML
   * hasta que volvamos a meter el componente en el Angular Zone
   */
  aumentarFueraNgZone(){
    this.texto = 'FUERA';
    this.progreso = 0; //lo reseteamos para la ejecución
    this._ngZone.runOutsideAngular(() => {
      this.incrementarProgreso(
        () => {
          /**
           * CUANDO TERMINE DE INCREMENTAR
           * es cuando pasamos a ejecutar en Angular Zone de nuevo
           * volvemos a recoplar el componente TS y HTML
           */
          this._ngZone.run(() =>  console.log(`${this.texto} de Angular Zone: Incremento terminado`));
        }
      );
    });
  }

}
