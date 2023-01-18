import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class OptIntPreloadingStrategy implements PreloadingStrategy {

  /**
   *
   * @param route La ruta recibida que debería cargar un módulo
   * @param load  el callback que carga el módulo
   * @returns ejecuta el callback de carga del módulo o devuelve un Observable vacío
   */
  preload(route: Route, load: Function): Observable<any> {
    // Evaluación que determina:
    // 1. Si dentro de la ruta hay un valor llamado "data"
    // 2. Si dentro del valor "data" hay una clave llamada "preload" a "true"
    // Entonces, ejecuta el callback y carga el módulo
    // Si no lo tiene, devuleve un Observable nulo para que se precargue el módulo
    return route.data && route.data['preload'] ? load() : EMPTY;
  }
}
