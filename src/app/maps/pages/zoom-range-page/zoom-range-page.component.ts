import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';
@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit {
  //nos sirve para tomar la referencia local #map en vez de usar un id
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {
    //hacemos una validación, por si el div es nulo
    if (!this.divMap) throw 'el elemento HTML no fué encontrado';

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
}
