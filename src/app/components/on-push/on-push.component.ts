import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-on-push',
  templateUrl: './on-push.component.html',
  styleUrls: ['./on-push.component.scss'],
  // changeDetection: ChangeDetectionStrategy.Default
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushComponent implements OnInit {

  /**
   * Valor que se va a incrementar cada segundo en archivo TS
   * y que dependiendo de la estrategia de Change Detention sus cambios se
   * van a poder ver en el HTML
   */

  segundos: number = 0;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      // Incrementa el valor de segundos
      this.segundos++;

      // Mostramos el valor por consolta
      console.log(`Segundos transcurridos: ${this.segundos} segundos`);
    },1000 )
  }


}
