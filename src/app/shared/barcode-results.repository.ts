import { Injectable } from '@angular/core';

import { BarcodeScannerResult } from 'cordova-plugin-scanbot-barcode-scanner';

@Injectable()
export class BarcodeResultsRepository {

    public barcodeScannerResult!: BarcodeScannerResult;

    constructor() { }
}
