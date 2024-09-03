import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation:[number,number] | undefined;
  public isLoading;

  get isUserLocationReady():boolean{
    return !!this.userLocation
  }

  constructor(private http:HttpClient) {

  }

  public async getUserLocation():Promise<[number,number]>{
    return new Promise((resolve,reject)=>{

      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          console.log(coords);
          this.userLocation = [coords.longitude,coords.latitude];
          resolve([coords.longitude,coords.latitude])
        },
        (error)=>{
          alert('No se pudo obtener la geolocalizacion');reject()
        }
      )
    })
  }

  public getPlaces(){
    return of([
      {
        name:'test 2',
        description:'description 2',
        coordinates:[-76.9190038,-12.2563534]
      }
    ])
    return this.http.get('https://run.mocky.io/v3/e62ba599-41f7-4860-abf8-15fec0004cb3');
  }


  public getPlacesApi(){
    return this.http.get('http://localhost:8000/api');
  }

}
