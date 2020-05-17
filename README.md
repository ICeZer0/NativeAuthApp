# [NativeAuthApp](https://levelup.gitconnected.com/create-an-authorization-flow-with-react-navigation-5-x-10b84677806b)

A React Native application with authentication flows built in.


## Supported Platforms

-   iOS 8+
-   Android (API 19+)

### Install

```shell
> npm install
```

After installing, you need to build the project

### Build

```shell
> npm run start
```

keep the terminal tab open and navigate to http://localhost:8081/

In a new tab run the app for your device

### Run Android

```shell
> npm run android
```

##### uninstall old app

```shell
> adb uninstall com.autoserve
```

### Run iOS

```shell
> npm run ios
```

### Troubleshooting

After upgrading react-native, you may have stale dependencies in ios.

    cd ios
    delete Podfile.lock
    pod deintegrate && pod install
    Navigate back to package.json directory
    run react-native run-ios
    In Xcode you can build your project again too

`pod install --repo-update`

---
### Donations

If you've found this repository helpful please consider donating. It will help to fund more projects like this
[![Donate with PayPal](https://raw.githubusercontent.com/stefan-niedermann/paypal-donate-button/master/paypal-donate-button.png)](https://paypal.me/embeddednature?locale.x=en_US)
