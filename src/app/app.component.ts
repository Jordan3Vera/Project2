import { Component, OnInit } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  // Variable para el ejemplo de rattach
  live: boolean = true;

  // Valores para el ejemplo de async pipe
  items = [{
    numero: 0
  }];
  items$ = new BehaviorSubject(this.items); //le pasamos valores por defecto

  chiste: string = '';

  constructor(private _swUpdate: SwUpdate,
              private _dataService: DataService)
  {}

  addItem(){
    const nuevoItem = Math.floor(Math.random() * 100) + 1;

    this.items.push(
      {
        numero: nuevoItem
      }
    );

    // Emitimos un nuevo valor de la lista de items
    // al componente suscrito
    this.items$.next(this.items);
  }

  ngOnInit(): void{
    // Recargar la caché nada más iniciarse el componente
    this.recargarCache();
  }

  /**
   * Método encargado de mostrar una alerta al usuario cuando
   * el service worker detecte una nueva versión disponible
   */
  recargarCache(){
    // Comprobamos que service worker está activo y detecta cambios de aprobación
    if(this._swUpdate.isEnabled){
      this._swUpdate.versionUpdates.subscribe({
        next: (event: VersionEvent) => {

          // Le decimos al service Worker que active la nueva versión
          this._swUpdate.activateUpdate()
          .then((value: boolean) => {
            // Cuando se detecta y emite el evento de una versión de la aplicación disponible
            // Consultamos al usuario si desea cargar la nueva versión
            if(confirm('Hay una nueva versión de la aplicación. ¿Deseas cargarla?')){
              // Le decimos al service worker que active la nueva versión
            }

            if(this._swUpdate.isEnabled){
              this._swUpdate.versionUpdates.subscribe({
                next: (event: VersionEvent) => {

                  // Le decimos al service Worker que active la nueva versión
                  this._swUpdate.activateUpdate()
                  this._swUpdate.activateUpdate()
                  .then((value: boolean) => {
                    // Si usuario dice que sí a la recarga, actualizamos la ventana limpiando caché
                    // para que el Servicer Worker capture los nuevos cambios y los registros
                    window.location.reload()
                  })
                  .catch((error) => console.error(`Ha habido un error al activar la nueva versión ${error}`))
                  .finally(() => console.info('Nueva versión activada'))
                }
              });
            }
          });
        },
        error: (err) => console.error(`Ha ocurrido un error al tratar de obtener una nueva versión: ${err}`),
        complete: () => console.log(`Finalizada recara de nueva versión`)
      });
    }
  }

  /**
   * Métod para solicitar un nuevo chiste a DataService
   */
  obtenerNuevoChiste(){
    this._dataService.obtenerFraseAleatoria().subscribe({
      next: (res: any) => this.chiste = res.value,
      error: (err) => console.error("Ha ahbido un erro al obtener unnuevo chiste: " + err),
      complete: () => console.info("Nuevo chiste obtenido")
    })
  }
}
