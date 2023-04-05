# Scanbot Barcode Scanner SDK Example for Cordova

This example app demonstrates how to integrate the [Scanbot Barcode Scanner SDK Cordova Plugin](https://scanbot.io/developer/cordova-barcode-scanner-plugin/) with [Cordova](https://cordova.apache.org) and [Ionic Framework](https://ionicframework.com).

The Scanbot Barcode Scanner SDK Cordova Plugin is available as [npm package](https://www.npmjs.com/package/cordova-plugin-scanbot-barcode-scanner).

Our branch strip_ios_simulator_arch demonstrates how to strip the x86_64 simulator architecture from the iOS build.

For more details about the Plugin please see this [documentation](https://docs.scanbot.io/barcode-scanner-sdk/cordova/introduction/).


## What is Scanbot Barcode Scanner SDK?

Scanbot Barcode Scanner SDK is a simple to use high level API, providing a collection of classes and functions for scanning and parsing 1D and 2D barcodes from your mobile device's camera or other image sources like your photo library.


## Trial License

The Scanbot SDK will run without a license for one minute per session!

After the trial period has expired, all SDK functions and UI components will stop working. You have to restart the app to get another one-minute trial period.

To test the Scanbot SDK without crashing, you can get a free “no-strings-attached” trial license. Please submit the [Trial License Form](https://scanbot.io/trial/) on our website.

## Free Developer Support

We provide free "no-strings-attached" developer support for the implementation & testing of the Scanbot SDK.
If you encounter technical issues with integrating the Scanbot SDK or need advice on choosing the appropriate
framework or features, please visit our [Support Page](https://docs.scanbot.io/support/).

## Supported Barcode Types

- [1D Barcodes](https://scanbot.io/products/barcode-software/1d-barcode-scanner/): [Codabar](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/codabar), [Code 39](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/code-39), [Code 93](https://scanbot.io/products/barcode-software/1d-barcode-scanner/code-93/), [Code 128](https://scanbot.io/products/barcode-software/1d-barcode-scanner/code-128/), [IATA 2 of 5](https://scanbot.io/products/barcode-software/1d-barcode-scanner/standard-2-of-5/), [Industrial 2 of 5](https://scanbot.io/products/barcode-software/1d-barcode-scanner/industrial-2-of-5/) [ITF](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/itf), [EAN-8](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/ean-code), [EAN-13](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/ean-code), [MSI Plessey](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/msi-plessey), RSS 14, [RSS Expanded (Databar)](https://scanbot.io/products/barcode-software/1d-barcode-scanner/gs1-databar/), [UPC-A](https://scanbot.io/products/barcode-software/1d-barcode-scanner/upc/), [UPC-E](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/upc-code).
- [2D Barcodes](https://scanbot.io/products/barcode-software/2d-barcode-scanner/): [Aztec](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/aztec), [Data Matrix](https://scanbot.io/en/sdk/scanner-sdk/barcode-scanner-sdk/datamatrix), [PDF417](https://scanbot.io/products/barcode-software/2d-barcode-scanner/pdf417/), [QR Code](https://scanbot.io/products/barcode-software/2d-barcode-scanner/qr-code/).

💡 Also check out our blog post [Types of barcodes](https://scanbot.io/blog/types-of-barcodes/).


## Supported Data Parsers:

- [AAMVA](https://scanbot.io/blog/drivers-license-barcode-parser/): Parse the AAMVA data format from PDF-417 barcodes on US driver's licenses.
- Boarding pass data from PDF417 barcodes.
- Parser for German Medical Certificates (aka. Disability Certificate or AU-Bescheinigung) coded in a PDF-417 barcode.
- [GS1](https://scanbot.io/products/barcode-software/1d-barcode-scanner/gs1-databar/) encoded data from barcodes.
- Data from PDF-417 barcodes on ID Cards.
- Parse and extract data from XML of Data Matrix barcodes on Medical Plans (German Medikationsplan).
- Data parser of QR-Code values printed on SEPA pay forms.
- vCard data from a QR-Code (e.g. on business cards).
- [Swiss QR](https://scanbot.io/products/barcode-software/2d-barcode-scanner/swiss-qr/) data from a QR-Code for easy, automatic and efficient payments.

For more details please refer to the SDK documentation.


## Documentation

👉 [Scanbot Barcode Scanner SDK documentation](https://docs.scanbot.io/barcode-scanner-sdk/windows/introduction/)

## How to run this example app?

Install the latest versions of [Cordova CLI](https://cordova.apache.org) and [Ionic CLI](https://ionicframework.com).
Fetch this repository and navigate to the project directory.

`cd scanbot-barcode-scanner-sdk-example-cordova-ionic/`

Install node modules:

`npm install`

Install Cordova platforms and plugins (defined in the `config.xml` of this app):

`ionic cordova prepare`

Check installed platforms and plugins:

`ionic cordova platform ls`

`ionic cordova plugin ls`

You should see *android* and *ios* as installed platforms and *cordova-plugin-scanbot-barcode-scanner*
as installed plugins.


Connect a device via USB and run the app.

**Android:**

`ionic cordova run android`

**iOS:**

`ionic cordova prepare ios`

Open the workspace `platforms/ios/Barcode Scanner SDK Example Ionic.xcworkspace` in Xcode and
adjust the *Signing* and *Provisioning* settings. Then build and run the app in Xcode.
