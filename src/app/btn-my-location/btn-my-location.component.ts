import { Component } from '@angular/core';
import { PlacesService } from '../services/places.service';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.scss']
})
export class BtnMyLocationComponent {

  constructor(private mapService:MapService,private placesService:PlacesService){

  }

  goToMyLocation(){
    this.placesService.getUserLocation().then(() => {
          const userLocation = this.placesService.userLocation;
          if (userLocation) {
            // Se crearia un nuevo mapa
            console.log(userLocation);

            this.mapService.flyTo(userLocation)
          }
        }).catch(error => {
          console.error('Error al obtener la ubicación del usuario:', error);
          alert('No se pudo obtener la ubicación del usuario');
        });
  }

}
