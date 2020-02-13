import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { Camera as ImagePicker } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

import ScanbotBarcodeSDK, {
  BarcodeScannerConfiguration,
  ScanbotBarcodeSDKConfiguration,
  BarcodeResult,
} from 'cordova-plugin-scanbot-barcode-scanner';

import { BarcodeResultsRepository } from '../shared/barcode-results.repository';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /*
   * TODO Add the license key of the Scanbot Barcode Scanner SDK here.
   * Please note: The Scanbot Barcode Scanner SDK will run without a license key for one minute per session!
   * After the trial period is over all Scanbot SDK functions as well as the UI components will stop working.
   * You can get an unrestricted "no-strings-attached" 30 day trial license key for free.
   * Please submit the trial license form (https://scanbot.io/sdk/trial.html) on our website by using
   * the app identifier "io.scanbot.example.sdk.barcode.ionic" of this example app
   * or of your app (see config.xml <widget id="your.app.id" ...>).
   */
  private readonly myLicenseKey = '';

  private barcodeSDK = ScanbotBarcodeSDK.promisify();

  constructor(private platform: Platform,
              private router: Router,
              private resultsRepo: BarcodeResultsRepository,
              private imagePicker: ImagePicker,
              private file: File) {
    this.platform.ready().then(() => this.initScanbotBarcodeSDK());
  }

  private async initScanbotBarcodeSDK() {
    try {
      const config: ScanbotBarcodeSDKConfiguration = {
        licenseKey: this.myLicenseKey,
        // Consider disabling logging in production builds for security and performance reasons!
        loggingEnabled: true,
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

  async startBarcodeQrCodeScanner(saveImage: boolean = false, qrCodesOnly: boolean = false) {
    if (!(await this.checkLicense())) { return; }

    const config: BarcodeScannerConfiguration = {
      barcodeImageGenerationType: (saveImage ? 'FROM_VIDEO_FRAME' : 'NONE'),
      finderLineColor: '#ff0000',
      cancelButtonTitle: 'Cancel',
      barcodeFormats: (qrCodesOnly ? ['QR_CODE'] : ['ALL_FORMATS']),
      finderTextHint: (qrCodesOnly ? 'Please align the QR code in the frame above to scan it.' :
          'Please align any supported 1D or 2D barcode in the frame above to scan it.'),
      // see further customization configs...
    };

    try {
      const result = await this.barcodeSDK.startBarcodeScanner(config);
      if (result.status === 'OK') {
        this.showBarcodeResults(result);
      }
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }

  async pickImageFromPhotoLibrary() {
    // Pick an image from Photo Library and run auto barcode detection on it.
    const picture = await this.imagePicker.getPicture({
      sourceType: this.imagePicker.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.imagePicker.MediaType.PICTURE,
      destinationType: this.imagePicker.DestinationType.FILE_URI,
      quality: 90,
      encodingType: this.imagePicker.EncodingType.JPEG,
      allowEdit: false,
    });
    if (!picture) {
      return;
    }
    const pickedImageFileUri = picture as string;

    if (!(await this.checkLicense())) { return; }

    try {
      const detectResult = await this.barcodeSDK.detectBarcodesOnImage({imageFileUri: pickedImageFileUri});
      if (detectResult.status === 'OK' && detectResult.barcodes) {
        this.showBarcodeResults(detectResult);
      } else {
        alert('No barcodes or QR-codes detected on this image.');
      }
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }

  async showBarcodeResults(result: BarcodeResult) {
    this.resultsRepo.barcodeResult = result;
    await this.router.navigateByUrl('/results');
  }

  async getLicenseInfo() {
    try {
      const result = await this.barcodeSDK.getLicenseInfo();
      alert(JSON.stringify(result));
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }

  async checkLicense() {
    const result = await this.barcodeSDK.getLicenseInfo();
    if (result.isLicenseValid === true) {
      // OK - we have a trial session, a valid trial license or valid production license.
      return true;
    }
    alert('Scanbot Barcode SDK trial period or (trial) license has expired.');
    return false;
  }

  async cleanupStorage() {
    try {
      const result = await this.barcodeSDK.cleanup();
      alert(JSON.stringify(result));
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }

}
