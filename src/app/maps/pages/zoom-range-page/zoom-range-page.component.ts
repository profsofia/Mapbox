import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';
@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit {

  public zoom : number = 10;
  public map?: Map;
  //nos sirve para tomar la referencia local #map en vez de usar un id
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {
    //hacemos una validación, por si el div es nulo
    if (!this.divMap) throw 'el elemento HTML no fué encontrado';

   this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  mapListeners(){
    if(!this.map) throw 'Mapa no inicializado';
    this.map.on('zoom', (event)=> {
      this.zoom = this.map!.getZoom();
    })

    //para que no haga demasiado zoom
    this.map.on('zoomend', (event)=> {
      if(this.map!.getZoom()> 0) return;
      this.map!.zoomTo(0);
      if(this.map!.getZoom()< 18) return;
      this.map!.zoomTo(18);

    })

  }

  zoomIn(){
    this.map!.zoomIn();
  }

  zoomOut(){
    this.map!.zoomOut();
  }

  zoomChanged(currentZoom : string){
    this.zoom = Number(currentZoom);
    this.map?.zoomTo(this.zoom);

  }
}
