import { Component, OnInit, Injectable, ChangeDetectorRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrecioBitcoinProvider{

  precio: number = 100;

  constructor(){
  // * Cada medio segundo se va a generar un nuevo precio del Bitcoin
    setInterval(() => {
      this.precio = Math.floor(Math.random() * 100) + 100;
      console.log(`Precio actual: ${this.precio}`);
    },500)
  }
}

@Component({
  selector: 'app-reattach',
  templateUrl: './reattach.component.html',
  styleUrls: ['./reattach.component.scss'],
  inputs: ['enVivo']
})
export class ReattachComponent implements OnInit {

  mostrarEnVivo: boolean = true;

  constructor(private _ref: ChangeDetectorRef,
              public precioBitcoin: PrecioBitcoinProvider)
  { }

  set enVivo(valor: boolean){
    this.mostrarEnVivo = valor;

    if(valor){
      this._ref.reattach(); //Reacoplamos TS y HTML para ver los camios en vivo
    }else{
      this._ref.detach(); //Resacoplamos el TS y HMTL para no actualizar las vista con los cambios
    }
  }

  ngOnInit(): void {
  }

}
