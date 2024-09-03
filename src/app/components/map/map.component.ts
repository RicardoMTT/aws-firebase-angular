import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PlacesService } from 'src/app/services/places.service';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { Marker } from 'mapbox-gl';
import { Router } from '@angular/router';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map') map: ElementRef;

  constructor(
    private placesService: PlacesService,
    private router: Router,
    private mapService: MapService
  ) {}


  ngAfterViewInit(): void {
    this.placesService
      .getUserLocation()
      .then(() => {
        const map = new mapboxgl.Map({
          container: this.map.nativeElement, //Donde se mostrara el mapa
          style: 'mapbox://styles/mapbox/streets-v12',
          center: this.placesService.userLocation,
          zoom: this.mapService.zoom.value
        });


        console.log('waht',this.placesService.userLocation);

        new Marker({ color: 'blue' })
            .setLngLat(this.placesService.userLocation)
            .addTo(map);

      this.mapService.setMap(map);

        this.placesService.getPlaces().subscribe({
          next: (response: any) => {

            console.log('response',response);


            const arrayMarkers = response;

            arrayMarkers.forEach((item, index) => {
              const popupContent = document.createElement('div');

              popupContent.className = 'card'

              popupContent.innerHTML = `<div class="">
              <img src="https://realplaza.vtexassets.com/arquivos/primavera-banner-desktop.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description || 'Descripción no disponible.'}</p>
              </div>
            </div>`;

              const atag = document.createElement('div');

              atag.innerHTML = `<a id="${index}">Ver más!</a>`;
              atag.style.padding = '0 16px';
              atag.className = 'cursor';
              popupContent.appendChild(atag);

              atag.addEventListener('click', (e) => {
                this.router.navigate(['detail']);
              });

              let popup = new mapboxgl.Popup({}).setDOMContent(popupContent);

              new Marker({ color: 'red' })
                .setLngLat(item.coordinates)
                .setPopup(popup)
                .addTo(map);

              this.mapService.setMap(map);
            });
          },
        });
      })
      .catch((_) => {
        alert('no hay ubicacion');
      });
  }
}
