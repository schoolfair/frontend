export const environment = {

  // Firebase

  apiUrl: 'https://us-central1-schoolfair-9b858.cloudfunctions.net/api',
  firebase: {
    projectId: 'schoolfair-9b858',
    appId: '1:566329469840:web:1e216cd96166d85ff62115',
    storageBucket: 'schoolfair-9b858.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyABpcpuZnZsPzdZdda6gVfpFVYIM-nf72o',
    authDomain: 'schoolfair-9b858.firebaseapp.com',
    messagingSenderId: '566329469840',
  },
  production: true,
  isEmulating: false,

  // Stripe

  stripeKey: 'pk_test_51MK2cjGnsOgkPr2ErqxMeue0Vxjn5werYj0oj0EA8Uq21Z7eVsICUAxYcoKNrzURYeNPlY4aMfinJVRPCZLblg4S00PRsI5qGH',
  stripePricing: {
    basic: 'price_1MKuiNGnsOgkPr2EbXf1cZYM',
    pro: 'price_1MKuk0GnsOgkPr2EikJbNhGd'
  },

  // AdSense

  adClientId: 'ca-pub-2984949598588246',
};
