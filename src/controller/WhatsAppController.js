import { Format } from './../util/Format';
import { CameraController } from './CameraController';
import { MicrophoneController } from './MicrophoneController';
import { DocumentPreviewController } from './DocumentPreviewController';
import { Firebase } from './../util/Firebase';
import { User } from './../model/User';
import { Chat } from './../model/Chat';
import { Message } from '../model/Message';
import { Base64 } from '../util/Base64';



export class WhatsAppController {
  
    constructor() {
        
        this._firebase = new Firebase();
        this.initAuth();
        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
        
    }

    initAuth() {

        this._firebase.initAuth().then(response => {    
        
            this._user = new User(response.user.email);
                    
            //Escuta alterações nos dados dos usuários
            this._user.on('datachange', data => {
                
                document.querySelector('title').innerHTML = `${data.name} | WhatsApp Clone`;
                this.el.inputNamePanelEditProfile.innerHTML = data.name;

                let img = this.el.myPhoto.querySelector('img');
                let imgEdit = this.el.imgPanelEditProfile;

                if (data.photo) {
                    img = this.el.imgPanelEditProfile;
                    img.src = data.photo;
                    img.show();
                    this.el.imgDefaultPanelEditProfile.hide();
                    imgEdit = this.el.myPhoto.querySelector('img');
                    imgEdit.src = data.photo;
                    imgEdit.show();
                } 

                this.initContacts();
            });
            

            this._user.name = response.user.displayName;
            this._user.email = response.user.email;
            this._user.photo = response.user.photoURL;

            this._user.save().then(() => {
                this.el.appContent.css({
                    display: 'flex'
                })
            });
        
        }).catch(err => {
            console.error(err);
        });
    }

    
    initContacts() {
        // this._user.save().then(() => {
        //<span class="_3T2VG">${Format.fbTimeStampToTime(contact.lastMessageTime)}</span>
            
            this._user.on('contactschange', docs => {
                
                this.el.contactsMessagesList.innerHTML = '';
              
                docs.forEach(doc => {
                    
                    let contact = doc.data()
                    let contactEl = document.createElement('div');
                              
                    contactEl.className = 'contact-item';
                    contactEl.id = contact.chatId; 
                    contactEl.innerHTML = `
                        <div class="dIyEr">
                            <div class="_1WliW" style="height: 49px; width: 49px;">
                                <img src="#" class="Qgzj8 gqwaM photo" style="display:none;">
                                <div class="_3ZW2E">
                                    <span data-icon="default-user" class="">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                                            <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
                                            <g fill="#FFF">
                                                <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"></path>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="_3j7s9">
                            <div class="_2FBdJ">
                                <div class="_25Ooe">
                                    <span dir="auto" title=${contact.name} class="_1wjpf">${contact.name}</span>
                                </div>
                                <div class="_3Bxar">
                                    <span class="_3T2VG">${contact.lastMessageTime}</span>
                                </div>
                            </div>
                            <div class="_1AwDx">
                                <div class="_itDl">
                                    <span title="digitando…" class="vdXUe _1wjpf typing" style="display:none">digitando…</span>

                                    <span class="_2_LEW last-message">
                                        <div class="_1VfKB">
                                            <span data-icon="status-dblcheck" class="">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                                                    <path fill="#263238" fill-opacity=".4" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"></path>
                                                </svg>
                                            </span>
                                        </div>
                                        <span dir="ltr" class="_1wjpf _3NFp9">${contact.lastMessage}</span>
                                        <div class="_3Bxar">
                                            <span>
                                                <div class="_15G96">
                                                    <span class="OUeyt messages-count-new" style="display:none;">1</span>
                                                </div>
                                        </span></div>
                                        </span>
                                </div>
                            </div>
                        </div>
                    `;

                    if (contact.photo) {

                        let img = contactEl.querySelector('.photo');

                        img.src = contact.photo;
                        img.show();

                    }   

                    contactEl.on('click', event => {

                        this.setActiveChat(contact)
           
                    });

                    

                    // contactEl.dataset.contact = JSON.stringify(contact);

                    this.el.contactsMessagesList.appendChild(contactEl);

                });

                // this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {

                //     item.on('click', event => {

                //         let contact = JSON.parse(item.dataset.contact);

                //         this.setActiveChat(contact);

                //     });


                // });

            });

            this._user.getContacts();

        // });
    
    }

    setActiveChat(contact){
      
        if (this._activeContact) {
            //Zero os onSnapshot anteriores
            Message.getRef(this._activeContact.chatId).onSnapshot(() => { });
        }
      
        this._activeContact = contact;

        this.el.activeName.innerHTML = contact.name;
        this.el.activeStatus.innerHTML = contact.status;

        if (contact.photo) {
            let img = this.el.activePhoto;
            img.src = contact.photo;
            img.show();
        }

        this.el.panelMessagesContainer.innerHTML = '';
      
        // "onSnapshot" - Busca a msg no firebase e atualiza na tela
        Message.getRef(this._activeContact.chatId).orderBy("timeStamp").onSnapshot(docs => {
           
            //Altura  do scroll
            let scrollTop = this.el.panelMessagesContainer.scrollTop;
          
            //O tamanho máximo de msg sem acionar a bara de rolamento
            let scrollTopMax = this.el.panelMessagesContainer.scrollHeight - this.el.panelMessagesContainer.offsetHeight;

            //Se altura ultrapassar o máximo "autoScroll recebe true"
            let autoScroll = (scrollTop >= scrollTopMax);

            const found = []
            docs.forEach(docMsg => {
                
                let data = docMsg.data();

                data.id = docMsg.id
                
                let message = new Message();    
                
                message.fromJSON(data);
                
                let me = (data.from === this._user.email)
                
                //Se não tiver mostrando essa msg, então mostre.
                if(!this.el.panelMessagesContainer.querySelector('#_' + data.id)){
                    
                    if (!me) {
                        //Se cair na msg lida pelo usuário 
                        docMsg.ref.set({
                            status: 'read'
                        }, {
                            merge: true
                        });
                    }
                    
                    let messageEl = message.getViewElement(me);

                    this.el.panelMessagesContainer.appendChild(messageEl);

                } else if(data.type === 'document') {

                    let contacts = document.querySelectorAll('.contact-item')

                    found.push([...contacts].find(element => element.id == this._activeContact.chatId))
                        
                   
                    //Se tiver na tela pego o elemento criado
                    let messageEl = message.getViewElement(me);
                    
                    // e atualizo a tela principal
                    this.el.panelMessagesContainer.querySelector('#_' + data.id).innerHTML = messageEl.innerHTML;

                }
                
                               
                if (this.el.panelMessagesContainer.querySelector('#_' + data.id) && me){
                    
                    //"'#_' + data.id" Id assim para evitar caso o firebase crie id com número da frente, pq os seletores como por exemplo ="querySelector" não aceita id com número da frente.
                   
                    //Se a msg já está na tela eu pego ela 
                    let msgEl = this.el.panelMessagesContainer.querySelector('#_' + data.id)

                    //e atualizo o status dela. para send
                    msgEl.querySelector('.message-status').innerHTML = message.getStatusViewElement().outerHTML;

                }
            
            });
            //Atualiza o painel principal com um clique no elemento do contato ativo
            if(found[0])found[0].click()
            

            if (autoScroll) {
                //Aumento a altura do scroll
                this.el.panelMessagesContainer.scrollTop = (this.el.panelMessagesContainer.scrollHeight - this.el.panelMessagesContainer.offsetHeight);
            } else {
                //Deixo a tela parada na altura de onde eu estiver lendo que é no scrollTop atualizado
                this.el.panelMessagesContainer.scrollTop = scrollTop;
            }
        });

        this.el.home.hide();
        this.el.main.css({
            display: 'flex'
        
        });
    }

    loadElements() {

        this.el = {};

        document.querySelectorAll('[id]').forEach(element => {
            //Faço um for em todos os ids, criando uma função para transforma-los em camelcase e passo o elemento para referenciar o id
            this.el[Format.getCamelcase(element.id)] = element;

        });

    }

    

    elementsPrototype() {

      Element.prototype.hide = function () {
          this.style.display = 'none';
          return this;
      }

      Element.prototype.show = function () {
          this.style.display = 'block';
          return this;
      }

      Element.prototype.toggle = function () {
        //   if (this.style.display === 'none') {
        //       this.show();
        //   } else {
        //       this.hide();
        //   }

        this.style.display = (this.style.display === 'none') ? 'block' : 'none'
          return this;
      }

      Element.prototype.on = function (events, fn) {

          events.split(' ').forEach(event => {

              this.addEventListener(event, fn);

          });
          return this;

      }

      Element.prototype.css = function (styles) {
         
          for (let name in styles) {
             this.style[name] = styles[name];

          }
          return this;

      }

      Element.prototype.addClass = function (name) {

          this.classList.add(name);
          return this;

      }

      Element.prototype.removeClass = function (name) {

          this.classList.remove(name);
          return this;

      }

      Element.prototype.toggleClass = function (name) {

          this.classList.toggle(name);
          return this;

      }

      Element.prototype.hasClass = function (name) {

          return this.classList.contains(name);

      }

      HTMLFormElement.prototype.getForm = function () {

        // Pega todos os campos dentro do formData
        return new FormData(this);

      }

      HTMLFormElement.prototype.toJSON = function () {

        let json = {};
        // Transformando retorn do formulário em json
        this.getForm().forEach((value, key) => {
            json[key] = value;
        });

        return json;

       }

  }

  initEvents() {

                
        this.el.inputSearchContacts.on('keyup', e => {
        
            if(this.el.inputSearchContacts.value.length > 0) {
                        
                this.el.inputSearchContactsPlaceholder.hide();
            } else {
             
                this.el.inputSearchContactsPlaceholder.show();
            }

            this._user.getContacts(this.el.inputSearchContacts.value);
       
        });
        
        
        this.el.myPhoto.on('click', event => {

            // this.el.panelAddContact.hide();
            // this.el.panelEditProfile.show().sleep(1, () => {
            //     this.el.panelEditProfile.addClass('open');
            // });
            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');
            }, 300);
            

        }); 

        this.el.btnNewContact.on('click', event => {

            // this.el.panelEditProfile.hide()
            // this.el.panelAddContact.show().sleep(1, () => {
            //     this.el.panelAddContact.addClass('open');
            // });
            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            }, 300);
        });

        this.el.btnClosePanelEditProfile.on('click', event => {

            // this.el.panelEditProfile.removeClass('open').sleep(300, () => {
            //     this.el.panelEditProfile.hide();
            // });
            this.el.panelEditProfile.removeClass('open')


        });

        this.el.btnClosePanelAddContact.on('click', event => {

            // this.el.panelAddContact.removeClass('open').sleep(300, () => {
            //     this.el.panelAddContact.hide();
            // });
            this.el.panelAddContact.removeClass('open')

        });


        this.el.photoContainerEditProfile.on('click', event => {

            this.el.inputProfilePhoto.click();

        });

      
        this.el.inputNamePanelEditProfile.on('keypress', event => {

            if (event.key === 'Enter') {
                event.preventDefault();
                this.el.btnSavePanelEditProfile.click();
            }

        });


        this.el.btnSavePanelEditProfile.on('click', event => {

            let name = this.el.inputNamePanelEditProfile.innerHTML;
            this.el.btnSavePanelEditProfile.disabled = true;

            this._user.name = name;
            this._user.save().then(() => {

                this.el.btnSavePanelEditProfile.disabled = false;
                this.el.btnClosePanelEditProfile.click();

            });
       

        });


        this.el.formPanelAddContact.on('submit', event => {

            event.preventDefault();

            // let formData = new FormData(this.el.formPanelAddContact);
            
            // let btn = this.el.formPanelAddContact.querySelector('[type="submit"]');

            // btn.disabled = true;

            let email = this.el.formPanelAddContact.getForm().get('email');
            let contact = new User(email);

            contact.on('datachange', data => {

                if (!data.name) {

                    let error = `O contato ${email} não foi encontrado.`;
                    console.error(error);

                } else {

                    Chat.createIfNotExists(this._user.email, email).then(chat => {

                        contact.chatId = chat.id;

                        this._user.addContact(contact).then(() => {
                        
                            this.el.btnClosePanelAddContact.click();
                        
                            console.info(`O contato ${email} foi adicionado.`);
                            // this.el.panelAddContact.hide();
                        });

                        this._user.chatId = chat.id;

                        contact.addContact(this._user);

                            // console.log('eu',this._user)
                            // console.log('meu contato',contact)
                    });

                }

                // btn.disabled = false;

            });

        });

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {

            // item.on('click', event => {

            //     let contact = JSON.parse(item.dataset.contact);

            //     this.setActiveChat(contact);

            // });
            item.on('click', event => {
                this.el.home.hide();
                this.el.main.css({
                    display: 'flex',
                })
            })   

        });

        this.el.btnAttach.on('click', event => {

            //semelhante ao default, usado para os eventos desse elemento não se propagarem para o evento pai
            event.stopPropagation();

            this.el.menuAttach.addClass('open');
            //Bind para passar o this dessa função para a outra
            document.addEventListener('click', this.closeMenuAttach.bind(this));

        });

        this.el.btnAttachPhoto.on('click', event => {

            // this.closeAllMainPanel();
            // this.el.panelMessagesContainer.show();
            this.el.inputPhoto.click();
            

        });

        this.el.inputPhoto.on('change', event => {

            [...this.el.inputPhoto.files].forEach(file => {
                
                Message.sendImage(this._activeContact.chatId, this._user.email, file);

            });

        });


        this.el.btnAttachCamera.on('click', event => {

            
            this.closeAllMainPanel();
            // this.el.panelMessagesContainer.hide();
            this.el.panelCamera.addClass('open');
            // this.el.panelCamera.sleep(100, () => {
            //     this.el.panelCamera.style.height = 'calc(100% - 120px)';
            // });
            this.el.panelCamera.css({
                'height': 'calc(100% - 120px)',
            });

            // this._cameraController = new CameraController(this.el.videoCamera);
            this._camera = new CameraController(this.el.videoCamera);


        });


        this.el.btnClosePanelCamera.on('click', event => {

            this._camera.stop();
            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();

        });


        this.el.btnTakePicture.on('click', event => {

            let picture = this._camera.takePicture();

            this.el.pictureCamera.src = picture;
            this.el.pictureCamera.show();
            this.el.videoCamera.hide();
            this.el.btnReshootPanelCamera.show();
            this.el.containerSendPicture.show();
            this.el.containerTakePicture.hide();
        });

        this.el.btnReshootPanelCamera.on('click', event => {

            this.el.btnReshootPanelCamera.hide();
            this.el.pictureCamera.hide();
            this.el.videoCamera.show();
            this.el.containerSendPicture.hide();
            this.el.containerTakePicture.show();

        });


        this.el.btnSendPicture.on('click', event => {

            this.el.btnSendPicture.disabled = true;

            let regex = /^data:(.+);base64,(.*)$/;
            let result = this.el.pictureCamera.src.match(regex);
            let mimeType = result[1];
            let ext = mimeType.split('/')[1];
       
            let filename = `camera${Date.now()}.${ext}}`;

            let picture = new Image();
            picture.src = this.el.pictureCamera.src;
            picture.onload = () => {

                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');

                canvas.setAttribute('width', picture.width);
                canvas.setAttribute('height', picture.height);

                //Desenverte a imagem
                context.translate(picture.width, 0);
                context.scale(-1, 1);
                context.drawImage(picture, 0, 0, canvas.width, canvas.height);

                fetch(canvas.toDataURL(mimeType)).then((res) => {return res.arrayBuffer();})
                .then((buffer) => { return new File([buffer], filename, { type: mimeType}); })
                .then(file => {
                    Message.sendImage(this._activeContact.chatId, this._user.email, file)
                    this.el.btnSendPicture.disabled = false;
                });

                    this.closeAllMainPanel();
                    this._camera.stop()
                    this.el.btnReshootPanelCamera.hide();
                    this.el.pictureCamera.hide();
                    this.el.videoCamera.show();
                    this.el.containerSendPicture.hide();
                    this.el.containerTakePicture.show();
                    this.el.panelMessagesContainer.show();
                    this.el.btnSendPicture.disabled = false;
            };

        });

        this.el.btnAttachDocument.on('click', event => {
            
            this.closeAllMainPanel()
            this.el.inputDocument.click();
             this.el.panelDocumentPreview.addClass('open');
             this.el.panelDocumentPreview.css({
                  // 'height': 'calc(100% - 120px)',
                  'height': 'calc(100%)',
            });

        });


        this.el.inputDocument.on('change', event => {

            if (this.el.inputDocument.files.length) {


                this.el.panelDocumentPreview.css({
                    'height': '1%'
                });

                let file = this.el.inputDocument.files[0];

                // this.closeAllMainPanel();
                // this.el.panelMessagesContainer.hide();
                // this.el.panelDocumentPreview.addClass('open');
                // this.el.panelDocumentPreview.sleep(500, () => {
                //     this.el.panelDocumentPreview.style.height = 'calc(100% - 120px)';
                // });
               


                this._documentPreviewController = new DocumentPreviewController(file);

                this._documentPreviewController.getPreviewData().then(result => {
                   
                    this.el.filePanelDocumentPreview.hide();
                    this.el.imagePanelDocumentPreview.show();
                    this.el.imgPanelDocumentPreview.src = result.src;
                    // this.el.imgPanelDocumentPreview.show();

                    this.el.infoPanelDocumentPreview.innerHTML = result.info;
                    this.el.panelDocumentPreview.css({
                        // 'height': 'calc(100% - 120px)',
                        'height': 'calc(100%)',
                    });
        
                    

                }).catch(err => {
                    
                    this.el.panelDocumentPreview.css({
                        // 'height': 'calc(100% - 120px)',
                        'height': 'calc(100%)',
                    });
        
                  
                    // if (event.error) {
                    //     console.error(event.event);
                    // } else {
                      

                        switch (file.type) {
                            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                            case 'application/msword':
                            case 'application/vnd.oasis.opendocument.text':
                                this.el.iconPanelDocumentPreview.classList.value = 'jcxhw icon-doc-doc';
                                break;

                            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                            case 'application/vnd.ms-excel':
                            case 'application/vnd.oasis.opendocument.spreadsheet':
                                this.el.iconPanelDocumentPreview.classList.value = 'jcxhw icon-doc-xls';
                                break;

                            case 'application/vnd.ms-powerpoint':
                            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                                this.el.iconPanelDocumentPreview.classList.value = 'jcxhw icon-doc-ppt';
                                break;

                            default:
                                this.el.iconPanelDocumentPreview.classList.value = 'jcxhw icon-doc-generic';
                        }

                        this.el.filePanelDocumentPreview.show();
                        this.el.imagePanelDocumentPreview.hide();
                       
                        this.el.filenamePanelDocumentPreview.innerHTML = file.name;

                    // }

                });

            }

        });

        this.el.btnClosePanelDocumentPreview.on('click', event => {

            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();

        });


        this.el.btnSendDocument.on('click', event => {
            
           
            let documentFile = this.el.inputDocument.files[0];

            if (documentFile.type === 'application/pdf') {

                Base64.toFile(this.el.imgPanelDocumentPreview.src).then(imageFile => {
                    
                    Message.sendDocument(this._activeContact.chatId, this._user.email, documentFile, imageFile, this.el.infoPanelDocumentPreview.innerHTML);

                });

            } else {

                Message.sendDocument(this._activeContact.chatId, this._user.email, documentFile);

            }

            this.el.btnClosePanelDocumentPreview.click();

        });



        this.el.btnAttachContact.on('click', event => {

            this.el.modalContacts.show();

            // this._contactsController = new ContactsController(this.el.modalContacts, this._user);

            // this._contactsController.open();

            // this._contactsController.on('select', contact => {

            //     Message.sendContact(this._activeContact.chatId, this._user.email, contact);

            //     this._contactsController.close();

            // });

        });

        this.el.btnCloseModalContacts.on('click', event => {

            this.el.modalContacts.hide();
            // this._contactsController.close();

        });

        this.el.btnSendMicrophone.on('click', event => {
           
            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();

            this._microphoneController = new MicrophoneController();
                            
            //"Agora consigo ouvir o evento ready"
            this._microphoneController.on('ready', musica => {
                
                //Começar a gravação
                this._microphoneController.startRecorder();
            });

            this._microphoneController.on('recordtimer', timer => {
                
                this.el.recordMicrophoneTimer.innerHTML = Format.toTime(timer);

                // Message.sendAudio(this._activeContact.chatId, this._user.email, file, metadata, this._user.photo);

            });

        });


        this.el.btnCancelMicrophone.on('click', event => {
            this._microphoneController.stopRecorder();
            this.closeRecordMicrophone();

        });

        this.el.btnFinishMicrophone.on('click', event => {

            // this._microphoneController.on('recorded', (file, metadata) => {

            //     Message.sendAudio(this._activeContact.chatId, this._user.email, file, metadata, this._user.photo);

            // });

            this._microphoneController.stopRecorder();
            this.closeRecordMicrophone();
            

        });

        this.el.inputText.on('keypress', event => {

            if (event.key === 'Enter' && !event.ctrlKey) {
                event.preventDefault();
                this.el.btnSend.click();
            }

        });

        this.el.inputText.on('keyup', event => {

            if (this.el.inputText.innerHTML.length) {
                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();
            } else {
                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();
            }

        });


        this.el.btnSend.on('click', event => {

            Message.send(this._activeContact.chatId, this._user.email, 'text', this.el.inputText.innerHTML);

            this.el.inputText.innerHTML = '';
            this.el.panelEmojis.removeClass('open');
            

        });

        this.el.btnEmojis.on('click', event => {

            this.el.panelEmojis.toggleClass('open');

            // if (this.el.panelEmojis.hasClass('open')) {
            //     this.el.iconEmojisOpen.hide();
            //     this.el.iconEmojisClose.show();
            // } else {
            //     this.el.iconEmojisOpen.show();
            //     this.el.iconEmojisClose.hide();
            // }

        });

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {

            emoji.on('click', event => {

                let img = this.el.imgEmojiDefault.cloneNode();

                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;

                emoji.classList.forEach(cls => {

                    img.classList.add(cls);

                });

                //Retorna parte do texto selecionada pelo usuário ou a posição atual do cursor.
                let cursor = window.getSelection();

                //Se o cursor não estiver focado no campo de input, forçamos o focus
                if (!cursor.focusNode || cursor.focusNode.id !== 'input-text') {
                    this.el.inputText.focus();
                    cursor = window.getSelection();
                }

                //Cria um novo objeto de controle de intervalos
                let range = document.createRange();
                //Retorna o intervalo atual do cursor
                range = cursor.getRangeAt(0);
                //Remove o conteúdo selecionado
                range.deleteContents();
                //Cria um fragmento de Documento
                var frag = document.createDocumentFragment();
                //Adiciona a imagem no fragmento
                frag.appendChild(img);
                //inserir o fragmento no intervalo
                range.insertNode(frag);
                //coloca o cursor após a imagem                    
                range.setStartAfter(img);
              
                //Força o playceholder desapareçer
                this.el.inputText.dispatchEvent(new Event('keyup'));

            });

        });

     
    }

    // startRecordMicrophoneTime() {

    //     let start = Date.now();

    //     this._recordMicrophoneInterval = setInterval(() => {
    //         this.el.recordMicrophoneTimer.innerHTML = Format.toTime(Date.now() - start);
    //     }, 100);

    //     // this._microphoneController = new MicrophoneController();

    //     // this._microphoneController.on('ready', event => {

    //     //     this._microphoneController.startRecorder();

    //     // });

    //     // this._microphoneController.on('timer', (data, event) => {

    //     //     this.el.recordMicrophoneTimer.innerHTML = data.displayTimer;

    //     // });

    // }

    closeRecordMicrophone() {

        // this._microphoneController.stopRecorder();
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
    }

    
    closeAllLeftPanel() {
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide()
    }

    closeMenuAttach(e) {

        this.el.menuAttach.removeClass('open');
        document.removeEventListener('click', this.closeMenuAttach);

    }


    closeAllMainPanel() {

        this.el.panelMessagesContainer.hide();

        // this.el.panelDocumentPreview.style.height = '10%';
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');

    }

}