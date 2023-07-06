// import * as firebase from 'firebase'
// import * as firestore from 'firebase/firestore'
// require('firebase/firestore')

export class Firebase {

    constructor() {


      this._config = {
        apiKey: "AIzaSyA8zcIf3tRFLcIB5AvydbAIAMI1iX7zXVs",
        authDomain: "whtas-app-clone-db7b1.firebaseapp.com",
        projectId: "whtas-app-clone-db7b1",
        storageBucket: "whtas-app-clone-db7b1.appspot.com",
        messagingSenderId: "251769200306",
        appId: "1:251769200306:web:7a3cd5b8b40fafb6b3b3ab"
    };
       this.init();

    }

    init(){

        if (!this._initialized) {
         
           // Initialize Firebase
           firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });
            
            this._initialized = true  
             
         }
    }

    // initAuth(){

    //     return new Promise((resolve, reject)=>{

    //         let provider = new firebase.auth.GoogleAuthProvider();

    //         firebase.auth().signInWithPopup(provider).then(function (result) {

    //             let token = result.credential.accessToken;
    //             let user = result.user;

    //             resolve(user, token);

    //         }).catch(function (error) {

    //             reject(error);

    //         });

    //     });        

    // }

    static db(){

        return firebase.firestore();

    }

    static hd() {

        return firebase.storage();

    }

}