// https://web.postman.co/workspace/My-Workspace~5705a449-510f-4861-87a9-73d3aa44996f/request/18328594-5739ea5b-b02b-4adc-8323-c88a68c5760a

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SearchGifsResonse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
  // A partir de la versión 4 de angular permite que los servicios puedan estar definidos en el momento en que se contruye el bundle de la aplicación
  // Unico y de manera global
})
export class GifsService {
  private apiKey      : string = '8gHqzy3JUHtC8MypLEhEjVDvlFf6kJic';
  private ServicioUrl : string = 'https://api.giphy.com/v1/gifs';
  private _historial  : string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient){
    this._historial = JSON.parse( localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')!) || [];

    // if ( localStorage.getItem('historial')){
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );
    // }
  }

  buscarGifs(query: string){
    query = query.trim().toLocaleLowerCase(); // quita los espacios a los extremos y no convierte todo a minusculas

    if(!this._historial.includes( query )){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
      // convierte un objeto o valor de JavaScript en una cadena de texto JSON
    }
    // console.log(this._historial);


    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);
      // console.log( params.toString() );


    // El get es de tipo generico, por eso se usa <>
    this.http.get<SearchGifsResonse>(`${ this.ServicioUrl }/search`, {params})
      .subscribe( (resp) => {
      // console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));

    }); // subscribe, se ejecuta cuando se tiene la resolucion de get, funciona parecido a un then






  /////////////////////////////////////
  // async buscarGifs(query: string)
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=8gHqzy3JUHtC8MypLEhEjVDvlFf6kJic&q=dbz&limit=10');
    // const data = await resp.json();
    //     console.log(data );
  /////////////////////////////////////

  /////////////////////////////////////
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=8gHqzy3JUHtC8MypLEhEjVDvlFf6kJic&q=dbz&limit=10')
    // .then( resp => {
    //   resp.json().then( data =>{
    //     console.log(data );
    //   })
    // });
  /////////////////////////////////////

  }
}
