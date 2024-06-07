import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-zoom',
  templateUrl: 'zoom.component.html',
  styleUrls:['./zoom.component.scss']
})

  export class ZoomComponent implements OnInit {
  constructor(private mapService:MapService) { }

  ngOnInit() { }
  zoomOut(){
    this.mapService.zoomOut();
  }

  zoomIn(){
    this.mapService.zoomIn();
  }
}
