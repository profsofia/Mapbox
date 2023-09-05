import { Component, ElementRef, ViewChild } from '@angular/core';
import {Map, LngLat, Marker} from 'mapbox-gl';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {
  @ViewChild('map') divMap?: ElementRef;
  public zoom : number = 10;
  public map?: Map;
  public lngLat : LngLat = new LngLat(-74.5, 40);

  ngAfterViewInit(): void {
    //hacemos una validación, por si el div es nulo
    if (!this.divMap) throw 'el elemento HTML no fué encontrado';

   this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });


    const marker = new Marker(
      //podemos personalizar todo del marcador, el color, el ícono
      {
        color: 'red',

      }
    )
    //establecemos el centro del mapa
    .setLngLat(this.lngLat)
    //añadimos el marcador al mapa
    .addTo(this.map);
  }


  createMarker(){
    if(!this.map) return;
    //esta constante nos permite crear un color de manera aleatoria.
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const lngLat = this.map.getCenter();
    this.addMarkerToMap(lngLat , color);
  }

  //metodo para añadir el marcador
  addMarkerToMap (lngLat: LngLat, color : string = 'red'){
    if(!this.map) return;

    //creamos el marcador
    const marker = new Marker({
      color: color,
      //propiedad que permite mover los marcadores
      draggable: true
    })
    .setLngLat( lngLat)
    .addTo(this.map);
  }
}
