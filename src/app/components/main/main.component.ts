import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { MapService } from "src/app/services/map.service";
import { PlacesService } from "src/app/services/places.service";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
})
export class MainComponent implements AfterViewInit{
  longitud: number;
  latitud: number;

  constructor(
    private placesService: PlacesService,
    private router: Router,
    private mapService: MapService
  ) {}

  ngAfterViewInit(): void {
    this.placesService
    .getUserLocation()
    .then(()=>{
      console.log(this.placesService.userLocation);
      this.latitud = -76.96398765223572;
      this.longitud = -12.185398066554665;

    })
  }

}
