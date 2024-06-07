import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { TutorialService } from './services/tutorial.service.component';
import { BtnMyLocationComponent } from './btn-my-location/btn-my-location.component';
import { AngularLogoComponent } from './angular-logo/angular-logo.component';
import { MapComponent } from './components/map/map.component';
import { DetailComponent } from './components/detail/detail.component';
import { MainComponent } from './components/main/main.component';
import { LegendComponent } from './components/legend/legend.component';
import { ZoomComponent } from './zoom/zoom.component';

@NgModule({
  declarations: [
    AppComponent,
    BtnMyLocationComponent,
    AngularLogoComponent,
    MapComponent,
    DetailComponent,
    MainComponent,
    LegendComponent,
    ZoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(
      {
          apiKey: "AIzaSyCZ9mZdRkz52jzHys_AwguSSkNmdMXe1Wo",
          authDomain: "angular15firebase-4f28d.firebaseapp.com",
          projectId: "angular15firebase-4f28d",
          storageBucket: "angular15firebase-4f28d.appspot.com",
          messagingSenderId: "649669028198",
          appId: "1:649669028198:web:ab99d627c240c522acc0a7"
        }
    ),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [
    TutorialService
  ],
  bootstrap: [AppComponent],
  exports:[BtnMyLocationComponent]
})
export class AppModule { }
