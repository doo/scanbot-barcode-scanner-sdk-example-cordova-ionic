import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Camera as ImagePicker } from '@ionic-native/camera/ngx';

import ScanbotBarcodeSDK, {
  BarcodeScannerConfiguration,
  BarcodeScannerResult,
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

  readonly currentYear = new Date().getFullYear();

  constructor(private router: Router,
    private resultsRepo: BarcodeResultsRepository,
    private imagePicker: ImagePicker) { }

  async startBarcodeQrCodeScanner(qrCodesOnly: boolean = false) {
    if (!(await this.checkLicense())) { return; }

    const config: BarcodeScannerConfiguration = {
      finderLineColor: '#ff0000',
      cancelButtonTitle: 'Cancel',
      barcodeFormats: (qrCodesOnly ? ['QR_CODE'] : []),
      finderTextHint: (qrCodesOnly ? 'Please align the QR code in the frame above to scan it.' :
        'Please align any supported 1D or 2D barcode in the frame above to scan it.'),
      // See further customization configs...

      // gs1HandlingMode: 'PARSE',
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
        this.showBarcodeResults(result.data);
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
      // barcodeFormats: ['DATA_MATRIX', 'QR_CODE', ...],
      // See further customization configs...

      // gs1HandlingMode: 'PARSE',
      // minimum1DBarcodesQuietZone: 10,
      // minimumTextLength: 2,
      // maximumTextLength: 11,
      // finderAspectRatio: {
      //   width: 2,
      //   height: 1
      // }
    };

    try {
      const result = await this.barcodeSDK.startBatchBarcodeScanner(config);
      if (result.status === 'OK') {
        this.showBarcodeResults(result.data);
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
      const detectResult = await this.barcodeSDK.detectBarcodesOnImage({ imageFileUri: pickedImageFileUri });
      if (detectResult.status === 'OK') {
        this.showBarcodeResults(detectResult.data);
      }
    } catch (e) {
      alert(JSON.stringify(e));
    }
  }

  async showBarcodeResults(result?: BarcodeScannerResult) {
    if (result?.barcodes && result.barcodes.length > 0) {
      this.resultsRepo.barcodeScannerResult = result;
      await this.router.navigateByUrl('/results');
    } else {
      alert('No barcodes or QR-codes detected');
    }
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
    if (result.data?.isLicenseValid === true) {
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
