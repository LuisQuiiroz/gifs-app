import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  // busca un elemento HTML que tenga una referencia local ('txtBuscar') y lo asigna al elemento txtBuscar
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement> ;
  // Non-null assertion operator
  // operador para asegurarse de que el objeto no es nulo


  constructor(private gifsService: GifsService){ }


  buscar(){
    
    const valor = this.txtBuscar.nativeElement.value;

    if( valor.trim().length === 0){
      return;
    }

    this.gifsService.buscarGifs(valor);
    // console.log(valor);
    this.txtBuscar.nativeElement.value = '';
    // console.log(this.txtBuscar);

    // JS puro
    // document.querySelector('input')?.value = '';
  }

}
