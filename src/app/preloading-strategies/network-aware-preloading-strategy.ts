import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';

export declare var navigator: any;

@Injectable({
  providedIn: 'root'
})
export class NetworkAwarePreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Comprueba que el usuario tiene buena conexión
    // * 1. En caso de que las función devuleva un true --> Carga el módulo
    // * 2. En caso de que la función devuelva un false --> No carga el módulo
    return this.hasGoodConnection() ? load() : EMPTY;
  }

  /**
   * Función que decide si un módulo se carga o no
   * Comprobando si el usuario tiene una conexión aceptable a internet
   * @returns {boolean} si puede o no cargar el módulo
   */
  hasGoodConnection(): boolean {
    const conn = navigator.connection;
    if (conn) {
      // Si el usuario tiene habilitado la reserva de datos (móvil)
      // En ese caso, no cargamos el módulo
      if (conn.saveData) {
        return false; // save data mode is enabled, so dont preload
      }

      // Lista de conexiones no válidas para precargar un módulo
      const avoidTheseConnections = ['slow-2g', '2g' /* , '3g', '4g' */];

      // Obtenemos el tipo de conexión que tiene el usuario
      const effectiveType = conn.effectiveType || '';

      // Comprobamos si la conexión de usuario está en ela lista de conexiones a evitar
      // En caso de que sea así precargamos el módulo
      if (avoidTheseConnections.includes(effectiveType)) {
        return false;
      }
    }

    // SI la conexión es estable y buena, se sobrecarga el módulo
    return true;
  }
}
