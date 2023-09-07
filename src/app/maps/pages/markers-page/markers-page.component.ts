import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'],
})
export class MarkersPageComponent {
  @ViewChild('map') divMap?: ElementRef;
  public zoom: number = 10;
  public map?: Map;
  public lngLat: LngLat = new LngLat(-74.5, 40);
  //propiedad que nos permite arreglar los marcadores al arreglo
  public markers: MarkerAndColor[] = [];

  ngAfterViewInit(): void {
    //hacemos una validación, por si el div es nulo
    if (!this.divMap) throw 'el elemento HTML no fué encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    //mandamos a llamar la funcion que lee el localStorage
    this.readToLocalStorage();

    //creamos un marcador complejo, como ejemplo
    const markerHtml = document.createElement('div');
    markerHtml.innerHTML = `<p><b>Sofia Schenone</b></p>`;
    const marker = new Marker(
      //podemos personalizar todo del marcador, el color, el ícono
      {
        color: 'red',
        element: markerHtml,
      }
    )
      //establecemos el centro del mapa
      .setLngLat(this.lngLat)
      //añadimos el marcador al mapa
      .addTo(this.map);
  }

  createMarker() {
    if (!this.map) return;
    //esta constante nos permite crear un color de manera aleatoria.
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const lngLat = this.map.getCenter();
    this.addMarkerToMap(lngLat, color);
  }

  //metodo para añadir el marcador
  addMarkerToMap(lngLat: LngLat, color: string = 'red') {
    if (!this.map) return;

    //creamos el marcador
    const marker = new Marker({
      color: color,
      //propiedad que permite mover los marcadores
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({
      color,
      marker,
    });
    this.saveToLocalStorage();
    marker.on('dragend', ()=> this.saveToLocalStorage());
  }

  deleteMarker(index: number) {
    //remueve el marcador del mapa
    this.markers[index].marker.remove();
    //para eliminarlos del arreglo
    this.markers.splice(index, 1);
  }

  flyToMarker(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage() {
    //console.log(this.markers);
    const plainMarkers: PlainMarker[] = this.markers.map(
      ({ color, marker }) => {
        return {
          color,
          lngLat: marker.getLngLat().toArray(),
        };
      }
    );
    //console.log(plainMarkers);
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readToLocalStorage() {
    //leemos la memoria, si el objeto es nullo entonces regresa un arreglo vacio,

    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString); //! potencialmente inseguro! puede que el objeto que le mandamos no luzca como la interfas y dar un error.

    //console.log(plainMarkers);

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarkerToMap(coords, color);
    });
  }
}
