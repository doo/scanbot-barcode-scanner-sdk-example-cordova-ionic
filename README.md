# Scanbot Barcode Scanner SDK Cordova Example

This example app shows how to integrate the Scanbot Barcode Scanner SDK Cordova Plugin 
with [Cordova](https://cordova.apache.org) and [Ionic Framework](https://ionicframework.com). 

The Scanbot Barcode Scanner SDK Cordova Plugin is available as [npm package](https://www.npmjs.com/package/cordova-plugin-scanbot-barcode-scanner).

For more details about the Plugin please see this [documentation](https://scanbotsdk.github.io/documentation/barcode-scanner-sdk/cordova/).


## What is Scanbot Barcode Scanner SDK?

The Scanbot Barcode Scanner SDK brings barcode scanning capabilities to your mobile apps. 
It provides functionality for scanning 1D and 2D barcodes, like EAN, UPC, QR code, Data Matrix, PDF 417, etc. 
For more details visit our website https://scanbot.io/sdk


## How to run this app

Install the latest versions of [Cordova CLI](https://cordova.apache.org) and [Ionic CLI](https://ionicframework.com). 
Fetch this repository and navigate to the project directory.

`cd scanbot-barcode-scanner-sdk-example-cordova-ionic/`

Install node modules:

`npm install`

Install Cordova platforms and plugins (defined in the `config.xml` of this app):

`cordova prepare`

Check installed platforms and plugins:

`cordova platform ls`

`cordova plugin ls`

You should see *android* and *ios* as installed platforms and *cordova-plugin-scanbot-barcode-scanner* 
as installed plugins. 


Connect a device via USB and run the app.

**Android:**

`ionic cordova run android`

**iOS:**

`ionic cordova prepare ios`

Open the workspace `platforms/ios/Barcode Scanner SDK Example Ionic.xcworkspace` in Xcode and 
adjust the *Signing* and *Provisioning* settings. Then build and run the app in Xcode.


## Please note

The Scanbot Barcode Scanner SDK will run without a license for one minute per session!

After the trial period is over all Scanbot Barcode Scanner SDK functions as well as the UI components 
(like Scanner UI) will stop working. You have to restart the app to get another trial period.

To get an unrestricted "no-strings-attached" 30 day trial license, please submit the 
[Trial License Form](https://scanbot.io/sdk/trial.html) on our website.
