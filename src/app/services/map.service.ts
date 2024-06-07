import { Injectable } from "@angular/core";

import {Map} from 'mapbox-gl'
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn:'root'
})
export class MapService {

  private map:Map;

  public zoom = new BehaviorSubject<number>(14);

  get isReady(){
    return !!this.map;
  }

  setMap(map:Map){
    this.map = map;
  }

  flyTo(coords:[number,number]){
    if (!this.isReady) {
      throw Error('error');
    }

    this.map?.flyTo({
      zoom:this.zoom.value,
      center:coords
    })
  }

  zoomIn(){
    if (!this.isReady) {
      throw Error('error');
    }

    const currentZoom = this.zoom.value;
    const newZoom = currentZoom - 1;

    this.zoom.next(newZoom)

    this.map?.flyTo({
      zoom:newZoom
    })

  }

  zoomOut(){
    if (!this.isReady) {
      throw Error('error');
    }

    const currentZoom = this.zoom.value;
    const newZoom = currentZoom + 1;
    console.log(newZoom);
    this.zoom.next(newZoom)

    this.map?.flyTo({
      zoom:newZoom
    })
  }

}
