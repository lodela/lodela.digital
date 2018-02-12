var config = {
    apiKey: "AIzaSyAFI3QXO5qgM9nch2BC5vXDS4EtJ9rwYYY",
    authDomain: "efan-d53b0.firebaseapp.com",
    databaseURL: "https://efan-d53b0.firebaseio.com",
    projectId: "efan-d53b0",
    storageBucket: "efan-d53b0.appspot.com",
    messagingSenderId: "245806630938"
  };
firebase.initializeApp(config);

const functions = require('firebase-functions');
const admin     = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.addMessage = functions.https.onRequest((req, res) => {
  const nombre     = req.query.nombre;
  const apellido   = req.query.apellido;
  var update      ={}
  var user = nombre+' '+apellido;
  var update = {};
  var startDate = new Date().toString();
            day = startDate.split(' ')[2];
            mes = startDate.split(' ')[1];
            yr  = startDate.split(' ')[3].slice(-2);
            hr  = startDate.split(' ')[4]
  datInit = day+'-'+mes+'-'+yr+' '+hr;
  update['/{pushId}/user/datInit'] = datInit;
  update['/{pushId}/user/datModf'] = '-';
  update['/{pushId}/user/desc']    = 'Descripción Pendiente';
  update['/{pushId}/user/name']    = nombre;
  update['/{pushId}/user/lastN']   = apellido;
  // res.send('Esto es lo que se escribirá: '+nombre+' '+apellido);
  res.send(JSON.stringify(update));
  // console.log(update); return;
  admin.database().ref('/messages')
    .push({user})
    .then(snapshot => {
      res.redirect(303, snapshot.ref);
    });
});

exports.makeUppercase = functions.database.ref('/messages/{pushId}/user')
  .onWrite(event=>{
    const user = event.data.val();
    console.log(user);
    console.log('Upercasing', event.params.pushId, user);
    const uppercase = user.toUpperCase().trim();

    return event.data.ref.parent.child('user').set(uppercase);

  });

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
