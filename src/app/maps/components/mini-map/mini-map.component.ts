import { AfterViewInit, Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  @Input() lngLat?: [number, number];
  public zoom: number = 10;
  public map?: Map;

  ngAfterViewInit(): void {
     //hacemos una validación, por si el div es nulo
     if (!this.divMap) throw 'el elemento HTML no fué encontrado';
     if(!this.lngLat) throw 'LngLat cant be null'
     const map = new Map({
       container: this.divMap.nativeElement, // container ID
       style: 'mapbox://styles/mapbox/streets-v12', // style URL
       center: this.lngLat, // starting position [lng, lat]
       zoom: 15, // starting zoom
       interactive: false
     });

     new Marker()
     .setLngLat(this.lngLat)
     .addTo(map)

  }
}
