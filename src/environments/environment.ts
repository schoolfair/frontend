// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  stripeKey: 'pk_test_51MK2cjGnsOgkPr2ErqxMeue0Vxjn5werYj0oj0EA8Uq21Z7eVsICUAxYcoKNrzURYeNPlY4aMfinJVRPCZLblg4S00PRsI5qGH',

  //apiUrl: 'http://127.0.0.1:5001/schoolfair-9b858/us-central1/api',
  apiUrl: 'https://us-central1-schoolfair-9b858.cloudfunctions.net/api',


  firebase: {
    apiKey: "AIzaSyABpcpuZnZsPzdZdda6gVfpFVYIM-nf72o",

  authDomain: "schoolfair-9b858.firebaseapp.com",

  projectId: "schoolfair-9b858",

  storageBucket: "schoolfair-9b858.appspot.com",

  messagingSenderId: "566329469840",

  appId: "1:566329469840:web:1e216cd96166d85ff62115"

  },

  firestoreEmulatorURL: 'http://127.0.0.1:8080',
  authEmulatorURL: 'http://localhost:9099',

  isEmulating: false,

  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
