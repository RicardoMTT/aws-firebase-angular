import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { TutorialService } from './service/tutorial.service.component';

@NgModule({
  declarations: [
    AppComponent
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
    AngularFireStorageModule
    // const firebaseConfig = {
    //   apiKey: "AIzaSyCZ9mZdRkz52jzHys_AwguSSkNmdMXe1Wo",
    //   authDomain: "angular15firebase-4f28d.firebaseapp.com",
    //   projectId: "angular15firebase-4f28d",
    //   storageBucket: "angular15firebase-4f28d.appspot.com",
    //   messagingSenderId: "649669028198",
    //   appId: "1:649669028198:web:ab99d627c240c522acc0a7"
    // };
  ],
  providers: [
    TutorialService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
