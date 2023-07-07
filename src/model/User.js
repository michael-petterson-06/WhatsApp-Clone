// import { Model } from './../util/Model'
import { Model } from './Model'
import { Firebase } from './../util/Firebase'

export class User extends Model {
// export class User extends ClassEvent {

    constructor(id){
        
        super();
        
        if(id) this.getById(id);

    }
    get name() { return this._data.name; }
    set name(value) { this._data.name = value; }

    get email() { return this._data.email; }
    set email(value) { this._data.email = value; }

    get photo() { return this._data.photo; }
    set photo(value) { this._data.photo = value; }

    // get chatId() { return this._data.chatId; }
    // set chatId(value) { this._data.chatId = value; }

    getById(id){
        return new Promise((s, f)=>{

            User.findByEmail(id).onSnapshot(doc => {

                this.fromJSON(doc.data());

                s(doc);

                // this.trigger('contactschange', contacts);

            })
        });        
    }

    static getRef(){
        return Firebase.db().collection('/users');
    }
           
    static findByEmail(email){
        return User.getRef().doc(email);
    }

    save(){

        return User.findByEmail(this.email).set(this.toJSON());

    }

    // constructor(id){
        
    //     // super();

    //     // this.id = id;

    //     // this.getByid();

    // }

    // getByid(){

    //     return new Promise((s, f)=>{

    //         User.getRef().doc(this.id).onSnapshot(doc => {

    //             this.doc = doc;

    //             this.fromJSON(doc.data());

    //             s(doc);

    //         });

    //     });        

    // }

   

    addContact(contact){
        //btoa forma uma strings sem caractéres especial(usei para evitar problema 
        // com o "." e o "@")
        return User.getRef()
            .doc(this.email).collection('contacts').doc(btoa(contact.email)).set(contact.toJSON());

    }

    // getContacts(){

    //     return new Promise((s, f)=>{

    //         User.getRef().doc(this.id).collection('contacts').onSnapshot(docs => {

    //             let contacts = [];

    //             docs.forEach(doc=>{

    //                 let data = doc.data();
    //                 data._id = doc.id;
    //                 contacts.push(data);

    //             });

    //             s(docs);

    //             this.trigger('contactschange', contacts);

    //         });

    //     });        

    // }

}