import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';
@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {


  public zoom : number = 10;
  public map?: Map;
  public lngLat : LngLat = new LngLat(-74.5, 40);
  //nos sirve para tomar la referencia local #map en vez de usar un id
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {
    //hacemos una validación, por si el div es nulo
    if (!this.divMap) throw 'el elemento HTML no fué encontrado';

   this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }
  ngOnDestroy(): void {
    //removiendo todo el mapa se limpian los listeners
    this.map?.remove();
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
    // este listener se dispara cada vez que el mapa se mueve
    this.map.on('move', ()=>{
      this.lngLat = this.map!.getCenter();
      console.log(this.lngLat);
    })

  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged(currentZoom : string){
    this.zoom = Number(currentZoom);
    this.map?.zoomTo(this.zoom);

  }
}
