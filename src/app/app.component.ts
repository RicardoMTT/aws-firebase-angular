import { Component } from '@angular/core';
import * as AWS from 'aws-sdk';
import { Tutorial, TutorialService } from './service/tutorial.service.component';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tutorials?: Tutorial[];
  currentTutorial?: Tutorial;
  currentIndex = -1;
  title = '';


  ngOnInit(): void {
    this.retrieveTutorials();
  }

  refreshList(): void {
    this.currentTutorial = undefined;
    this.currentIndex = -1;
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    const tutorial  = new Tutorial();
    tutorial.key="123";
    tutorial.description="desc";
    this.tutorialService.create(tutorial).then(() => {
      console.log('Created new item successfully!');
      // this.submitted = true;
    });
    this.tutorialService.getAll().snapshotChanges().pipe(
      map((changes) =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log('data',data);

      this.tutorials = data;
    });
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }

  private s3: AWS.S3;

  constructor(private tutorialService: TutorialService) {
    // Configurar las credenciales de AWS (recomendado hacerlo en el servidor)
    AWS.config.update({
      accessKeyId: environment.accessKeyId,
      secretAccessKey: environment.secretAccessKey,
      region: environment.region
    });

    // Crear una instancia de S3
    this.s3 = new AWS.S3();
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
        Body: this.archivo
      };

      s3.upload(params, (err:any, data:any) => {
        if (err) {
          console.log('Error al subir el archivo:', err);
        } else {
          console.log('Archivo subido correctamente:', data.Location);
        }
      });
    }
  }
}
