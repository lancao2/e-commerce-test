const  firebase  =  require ( "firebase-admin/app" );

firebase.inicializeApp({
    credential: admin.credential.cert('firebase-adminsdk-cj1uo@alexlan.iam.gserviceaccount.com'),
    storageBucket: 'gs://alexlan.appspot.com'
  });