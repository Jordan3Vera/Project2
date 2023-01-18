import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class AttrDirective {

  @Input() defaultColor = '';
  @Input('appHighlight') highlightColor = '';


  constructor(private _elementRef: ElementRef) { }

  // Comportamiento para MOUSE ENTER en el componente
  @HostListener('mouseenter') onMouseEnter(){
    this._cambiarColor(this.highlightColor || this.defaultColor || 'tomato'); //Ponemos el color de fondo
  }

  @HostListener('mouseleave') onMouseLeave(){
    this._cambiarColor(null); //Quitamos el color de fondo
  }

  /**
   * Método encargado de cambiar el color d efndo de un componente
   * @param color Color para el fondo del componente
   */
  private _cambiarColor(color: string | null) {
    this._elementRef.nativeElement.style.backgroundColor = color;
  }

}
