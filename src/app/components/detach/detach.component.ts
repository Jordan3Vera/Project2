import { Component, OnInit, Injectable, ChangeDetectorRef } from '@angular/core';
import * as Mock from 'mockjs';


@Injectable({
  providedIn: 'root'
})
export class DataListProvider{

  /**
   * Método que devuleve una lista de nombre aleatorios
   * @return {[]} lista de nombre aleatorios
   */
  get data(){
    const RandomName = Mock.Random;
    return [
      RandomName.first(),
      RandomName.first(),
      RandomName.first(),
      RandomName.first()
    ]
  }
}

@Component({
  selector: 'app-detach',
  templateUrl: './detach.component.html',
  styleUrls: ['./detach.component.scss']
})
export class DetachComponent implements OnInit {

  constructor(private _ref: ChangeDetectorRef,
              public dataListProvider: DataListProvider)
  { }

  ngOnInit(): void {

    // *Desacoplamos el componente del HTML con el método DETACH
    this._ref.detach();

    /**
     * * Cuando un componente está DESCOPLADO, solo hay dos formas de decirle que
     * replique los cambios en el HTML:
     * ? 1. detectCahnges() --> Detectar los cambios en ese momento y actualizar HMTL
     * ? 2. reattach() --> (mostrando en el otro ejemplo) sirve para volver a ACOPLAR el componente
     */

    // Cada 3 segundos, le decimos a Angular que revise los nombres generados
    // Es decir, que detecte los cambios en el componenten y los replique en el HTML
    setInterval(() => {
      //Detectamos los cambios y recoplamos puntualmente el componente
      this._ref.detectChanges();
    },3000);
  }

}
