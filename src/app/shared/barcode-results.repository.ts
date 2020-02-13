import { Injectable } from '@angular/core';

import { BarcodeResult } from 'cordova-plugin-scanbot-barcode-scanner';

@Injectable()
export class BarcodeResultsRepository {

    public barcodeResult: BarcodeResult;

    constructor() { }
}
