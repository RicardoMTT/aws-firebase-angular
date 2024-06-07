import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-detail',
  standalone: false,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {

  lugar: any = {
    nombre: 'Baño Público Central',
    descripcion: 'Baño público gratuito ubicado en el centro de la ciudad.',
    imagenes: [
      { url: 'https://via.placeholder.com/800x600', nombre: 'Imagen 1' },
      { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png', nombre: 'Imagen 2' },
      { url: 'https://via.placeholder.com/800x600', nombre: 'Imagen 3' }
    ],
    informacionAdicional: 'Abierto las 24 horas. Accesible para personas con discapacidad.',
    referencias: 'Cerca de la plaza principal y el parque central.'
  };


 }
