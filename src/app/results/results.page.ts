import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { BarcodeResultsRepository } from '../shared/barcode-results.repository';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  snappedBarcodeImageUri = '';

  constructor(public resultsRepo: BarcodeResultsRepository,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.resultsRepo.barcodeResult.imageFileUri) {
      this.snappedBarcodeImageUri = this.sanitizeFileUri(this.resultsRepo.barcodeResult.imageFileUri);
    }
  }

  private sanitizeFileUri(fileUri: string): string {
    // see https://ionicframework.com/docs/building/webview/#file-protocol
    const convertedUri = (window as any).Ionic.WebView.convertFileSrc(fileUri);
    // see https://angular.io/guide/security#bypass-security-apis
    return this.sanitizer.bypassSecurityTrustUrl(convertedUri) as string;
  }

}
