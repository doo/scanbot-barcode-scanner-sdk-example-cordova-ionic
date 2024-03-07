import { Component } from '@angular/core';

import { BarcodeResultsRepository } from '../shared/barcode-results.repository';
import { ByteArrayUtils } from '../utils/byte-array-utils';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage {

  snappedBarcodeImageUri = '';

  constructor(public resultsRepo: BarcodeResultsRepository) { }
  
  rawBytesToHex    (rawBytes: number[]): string { return ByteArrayUtils.toHex(rawBytes); }
  rawBytesToString (rawBytes: number[]): string { return ByteArrayUtils.toString(rawBytes); }
  rawBytesToBase64 (rawBytes: number[]): string { return ByteArrayUtils.toBase64(rawBytes); }
}
