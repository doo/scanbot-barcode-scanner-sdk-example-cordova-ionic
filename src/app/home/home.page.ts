import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

import { Camera as ImagePicker } from '@ionic-native/camera/ngx';

import ScanbotBarcodeSDK, {
  BarcodeScannerConfiguration,
  BarcodeResult,
  BatchBarcodeScannerConfiguration,
} from 'cordova-plugin-scanbot-barcode-scanner';

import { BarcodeResultsRepository } from '../shared/barcode-results.repository';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private barcodeSDK = ScanbotBarcodeSDK.promisify();

  constructor(private platform: Platform,
              private router: Router,
              private resultsRepo: BarcodeResultsRepository,
              private imagePicker: ImagePicker) { }

  async startBarcodeQrCodeScanner(saveImage: boolean = false, qrCodesOnly: boolean = false) {
    if (!(await this.checkLicense())) { return; }

    const config: BarcodeScannerConfiguration = {
      barcodeImageGenerationType: (saveImage ? 'FROM_VIDEO_FRAME' : 'NONE'),
      finderLineColor: '#ff0000',
      cancelButtonTitle: 'Cancel',
      barcodeFormats: (qrCodesOnly ? ['QR_CODE'] : ['ALL_FORMATS']),
      finderTextHint: (qrCodesOnly ? 'Please align the QR code in the frame above to scan it.' :
          'Please align any supported 1D or 2D barcode in the frame above to scan it.'),
      // See further customization configs...
      
      // enableGS1Decoding: false,
      // minimum1DBarcodesQuietZone: 10,
      // minimumTextLength: 2,
      // maximumTextLength: 11,
      // cameraZoomFactor: 1,
      // finderAspectRatio: {
      //   width: 2,
      //   height: 1
      // }
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

  async startBatchBarcodeScanner() {
    if (!(await this.checkLicense())) { return; }

    const config: BatchBarcodeScannerConfiguration = {
      finderLineColor: '#ff0000',
      cancelButtonTitle: 'Cancel',
      // See further customization configs...

      // enableGS1Decoding: false,
      // minimum1DBarcodesQuietZone: 10,
      // minimumTextLength: 2,
      // maximumTextLength: 11,
      // finderAspectRatio: {
      //   width: 2,
      //   height: 1
      // }
    }

    try {
      const result = await this.barcodeSDK.startBatchBarcodeScanner(config);
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
