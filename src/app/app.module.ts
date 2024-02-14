import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BarcodeResultsRepository } from './shared/barcode-results.repository';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeResultsRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
