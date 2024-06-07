import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoicmljYXJkb3RvdmFyMDAzIiwiYSI6ImNreDd0aXQxYjBmYjEyb2szajkxdnFpajEifQ.fR6bJOUOB9OGJ6tE0Wkt4A';



if (!navigator.geolocation) {
  alert('navegador no soporta la geolocalización')
  throw new Error('navegador no soporta la geolocalización')
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
