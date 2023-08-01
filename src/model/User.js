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

    get status() { return this._data.status; }
    set status(value) { this._data.status = value; }

    get chatId() { return this._data.chatId; }
    set chatId(value) { this._data.chatId = value; }

    get uid() { return this._data.uid; }
    set uid(value) { this._data.uid = value; }

    get statusUser() { return this._data.statusUser; }
    set statusUser(value) { this._data.statusUser = value; }

    

    getById(userEmail){
        return new Promise((s, f)=>{

            User.findByEmail(userEmail).onSnapshot(doc => {

                this.fromJSON(doc.data());

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

   
    addContact(contact){
        //btoa forma uma strings sem caractéres especial(usei para evitar problema 
        // com o "." e o "@")
        return User.getRef().doc(this.email).collection('contacts').doc(btoa(contact.email)).set(contact.toJSON());

    }

    getContacts(filter = ''){

        return new Promise((s, f)=>{
           
            User.getRef().doc(this.email).collection('contacts').where('name', '>=', filter).onSnapshot(docs => {

                let contacts = [];

                docs.forEach(doc=>{

                    let data = doc.data();
                    data.id = doc.id;
                    contacts.push(data);

                });

                this.trigger('contactschange', docs);
             
                s(contacts);
            });

        });        

    }

}