import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { File } from '@ionic-native/file/ngx';

import { environment } from '../environments/environment';
import ScanbotBarcodeSDK, { ScanbotBarcodeSDKConfiguration } from 'cordova-plugin-scanbot-barcode-scanner';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  /*
   * TODO Add the license key of the Scanbot Barcode Scanner SDK here.
   * Please note: The Scanbot Barcode Scanner SDK will run without a license key for one minute per session!
   * After the trial period is over all Scanbot SDK functions as well as the UI components will stop working.
   * You can get an unrestricted "no-strings-attached" 30 day trial license key for free.
   * Please submit the trial license form (https://scanbot.io/en/sdk/demo/trial) on our website by using
   * the app identifier "io.scanbot.example.sdk.barcode.ionic" of this example app
   * or of your app (see config.xml <widget id="your.app.id" ...>).
   */
  private readonly myLicenseKey = '';

  private barcodeSDK = ScanbotBarcodeSDK.promisify();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private file: File
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initScanbotBarcodeSDK();
    });
  }

  private async initScanbotBarcodeSDK() {
    try {
      const config: ScanbotBarcodeSDKConfiguration = {
        licenseKey: this.myLicenseKey,
        loggingEnabled: !environment.production, // Disable logging in production builds for security and performance reasons!
        // optional custom storageBaseDirectory for snapped images - see the comments below.
        storageBaseDirectory: this.getDemoStorageBaseDirectory()
      };
      await this.barcodeSDK.initializeSdk(config);
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }

  private getDemoStorageBaseDirectory(): string {
    // tslint:disable:max-line-length
    // !! Please note !!
    // It is strongly recommended to use the default (secure) storage location of the Scanbot Barcode Scanner SDK.
    // However, for demo purposes we overwrite the "storageBaseDirectory" of the Scanbot Barcode Scanner SDK by a custom storage directory.
    //
    // On Android we use the "externalDataDirectory" which is a public(!) folder.
    // The optional image files snapped by the Scanbot Barcode Scanner SDK in this demo app will be stored
    // in this public storage directory and will be accessible for every(!) app having external storage permissions!
    // Again, this is only for demo purposes, which allows us to easily fetch and check the generated files
    // via Android "adb" CLI tools, Android File Transfer app, Android Studio, etc.
    //
    // On iOS we use the "documentsDirectory" which is accessible via iTunes file sharing.
    //
    // For more details about the storage system of the Scanbot Barcode Scanner SDK Plugin please see our docs:
    // - https://scanbotsdk.github.io/documentation/barcode-scanner-sdk/cordova/
    //
    // For more details about the file system on Android and iOS we also recommend to check out:
    // - https://developer.android.com/guide/topics/data/data-storage
    // - https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html
    // tslint:enable:max-line-length

    if (this.platform.is('android')) {
      return this.file.externalDataDirectory + 'my-custom-storage';
    } else if (this.platform.is('ios')) {
      return this.file.documentsDirectory + 'my-custom-storage';
    }
    return null;
  }

}
