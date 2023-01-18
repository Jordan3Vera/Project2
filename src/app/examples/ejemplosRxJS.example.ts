import { of, Observable, fromEvent, interval } from 'rxjs';
import { take, zip, map } from 'rxjs/operators';

// * 1. Creación de observable
// Creamos un observable que emite 2 valores: 'Hola' y después emitirá 'Martín'
const observable = of('Hola', 'Martín', 30);

// * 2. Creación de Observable
const observer = {
  next: (valor: string | number) => console.log(`- ${valor}`),
  error: (error: any) => console.log(`Error: ${error}`),
  complete: () => console.info(`¡Hemos terminado!`)
}

// * Ejecución del observable => Imprecindible una subscripción
observable.subscribe(observer);


// *** EJEMPLO 2 ***
// * Creación de una función que devuelva un Observable personalizado
export const miObservableDeStrings = (...args: string[]): Observable<string> => {
  return new Observable((observer) => {
if(args.length == 4){
  observer.error(`Tiene demasiados argumentos`);
}

    // para cada uno de los argumentos emitimos por parámetro
    args.forEach((arg: string) => observer.next(arg)); //Emitimos todos los valores que recibamos
    observer.complete(); //Completamos el observer
  });
}
// miObservableDeStrings('Hola','Martín','¿Qué','Tal?');

// *** EJEMPLO 3 (observable a aprtir de evntos en el dom)***
// Generación de valores a partir de eventos en el DOM
// Para ello usaremos "fromEvent" de rxJS

// * 1. Creamos el observable a partir de fromEvent
const observableClicks = fromEvent(document, 'click');

// * 2. Creación de observer del observable
observableClicks.subscribe({
  next: (valor: Event) => console.log(`Ha ocurrido un evento: ${valor.type}`),
  error: (err: any) => console.log(`Ha ocurrido un error: ${err}`),
  complete: () => console.info('Terminado observable que escucha clicks')
});

// *** EJEMPLO 4 (observable a partir de intervalo) ***
// * 1. Definimos el observable a partir de un intervalo que se emite cada 2 segundos
const observable2 = interval(2000);

// * 2. Creamos el observer que consuma los valores, pero solo se quede con los 3 primeros
observable2.pipe(
  take(3) // le decimos que solo nos interesan los 3 primero
).subscribe({
  next: (valor: number) => console.log(`Valor: ${valor}`),
  error: (err) => console.error(`Ha ocurrido un error: ${err}`),
  complete: () => console.info(`Obtenidos los 3 primero valores del intervalo`)
});

// *** EJEMPLO 5 (uso de operadores: ZIP y MAP)
const timer$ = interval(1000);
const pieces$ = of('', '♞', '', '♞', '♘', '♞');
const columns$ = of('e', 'c', 'g', 'd', 'e', 'f');
const rows$ = of('4', '6', '4', '4', '2', '3');

// *** EJEMPLO 6 (agrupacion de valores) ***
const observable3 = interval(1000).pipe(
  // groupBy(n => n % 2)
)
