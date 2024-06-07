import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
import * as AWS from 'aws-sdk';
import {
  Tutorial,
  TutorialService,
} from './services/tutorial.service.component';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlacesService } from './services/places.service';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import {Popup,Marker} from 'mapbox-gl';
import { Router } from '@angular/router';
import { MapService } from './services/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentInit{
  tutorials?: Tutorial[];
  currentTutorial?: Tutorial;
  currentIndex = -1;
  title = '';



  ngOnInit(): void {

  }

  refreshList(): void {
    this.currentTutorial = undefined;
    this.currentIndex = -1;
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    const tutorial = new Tutorial();
    tutorial.key = '123';
    tutorial.description = 'desc';
    this.tutorialService.create(tutorial).then(() => {
      console.log('Created new item successfully!');
      // this.submitted = true;
    });
    this.tutorialService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        console.log('data', data);

        this.tutorials = data;
      });
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService
      .deleteAll()
      .then(() => this.refreshList())
      .catch((err) => console.log(err));
  }

  private s3: AWS.S3;
// @ViewChild('markerElement') markerElement!: ElementRef;


  constructor(
    private placesService: PlacesService,
    private tutorialService: TutorialService,
    private router:Router,
    private mapService:MapService
  ) {
    // Configurar las credenciales de AWS (recomendado hacerlo en el servidor)
    // AWS.config.update({
    //   accessKeyId: environment.accessKeyId,
    //   secretAccessKey: environment.secretAccessKey,
    //   region: environment.region
    // });
    // Crear una instancia de S3
    // this.s3 = new AWS.S3();
  }

  @ViewChild('map') map!: ElementRef;



  ngAfterContentInit() {


  }
  handleMarkerClick(index: number): void {
    // const clickedMarker = arrayMarkers[index];
    console.log('Elemento clickeado:');
    // Aquí puedes agregar la lógica adicional que desees
  }

  redirect(item) {
    console.log('Elemento clickeado:', item.name);
    // Aquí puedes agregar cualquier lógica adicional que desees
  }

  archivo: File | null = null;

  onFileSelected(event: any) {
    this.archivo = event.target.files[0];
  }

  subirArchivo() {
    if (this.archivo) {
      const s3 = new AWS.S3();
      const clave = `${Date.now()}_${this.archivo.name}`; // Genera una clave única para el archivo

      const params = {
        Bucket: 'twitch-fazt-node',
        Key: clave,
        Body: this.archivo,
      };

      s3.upload(params, (err: any, data: any) => {
        if (err) {
          console.log('Error al subir el archivo:', err);
        } else {
          console.log('Archivo subido correctamente:', data.Location);
        }
      });
    }
  }



}
