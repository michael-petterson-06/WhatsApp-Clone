// import * as firebase from 'firebase'
// import * as firestore from 'firebase/firestore'
// require('firebase/firestore')

export class Firebase {

    constructor() {

      this._config = {
        apiKey: "AIzaSyA4BjqmuMhMgyPbNXUOLppQDPaNtcA2B9o",
        authDomain: "whtas-app-clone-6628e.firebaseapp.com",
        projectId: "whtas-app-clone-6628e",
        storageBucket: "whtas-app-clone-6628e.appspot.com",
        messagingSenderId: "216701029796",
        appId: "1:216701029796:web:512e270c0a49bd84b28531",
        measurementId: "G-5WD0TTDF0D"
    };
       this.init();

    }

    init(){

        if (!window._initializedFirebase) {
         
           // Initialize Firebase
           firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });
            
            window._initializedFirebase = true  
             
         }
    }

    initAuth(){

        return new Promise((resolve, reject)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function (result) {

                let token = result.credential.accessToken;
                let user = result.user;

                resolve({user, token});

            }).catch(function (error) {

                reject(error);

            });

        });        

    }

    static db(){

        return firebase.firestore();

    }

    static hd() {

        return firebase.storage();

    }

}