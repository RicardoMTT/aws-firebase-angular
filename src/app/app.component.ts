import { Component } from '@angular/core';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular15-firebase';

  private s3: AWS.S3;

  constructor() {
    // Configurar las credenciales de AWS (recomendado hacerlo en el servidor)
    AWS.config.update({
      accessKeyId: 'AKIA2WAHYSIH2KNI6RBB',
      secretAccessKey: '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',
      region: 'us-east-1'
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
