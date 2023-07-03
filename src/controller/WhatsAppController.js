class WhatsAppController {
  
    constructor() {
        

        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
    }

    loadElements() {

      this.el = {};

      document.querySelectorAll('[id]').forEach(element => {
        //Faço um for em todos os ids, criando uma função para transforma-los
        // em camelcase e passo o elemento para referenciar o id
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

        return new FormData(this);

      }

      HTMLFormElement.prototype.toJSON = function () {

        let json = {};

        this.getForm().forEach((value, key) => {
            json[key] = value;
        });

        return json;

       }

  }

  initEvents() {

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

            // let name = this.el.inputNamePanelEditProfile.innerHTML;

            // this._user.name = name;
            // this._user.save().then(() => {

            //     this.el.btnClosePanelEditProfile.click();

            // });
            console.log(this.el.inputNamePanelEditProfile.innerHTML)

        });


        this.el.formPanelAddContact.on('submit', event => {

            event.preventDefault();

            // let btn = this.el.formPanelAddContact.querySelector('[type="submit"]');

            // btn.disabled = true;

            // let email = this.el.formPanelAddContact.getForm().get('email');
            // let contact = new User(email);

            // contact.on('datachange', data => {

            //     if (!data.name) {

            //         let error = `O contato ${email} não foi encontrado.`;
            //         console.error(error);

            //     } else {

            //         Chat.createIfNotExists(this._user.email, email).then(chat => {

            //             contact.chatId = chat.id;

            //             this._user.addContact(contact);

            //             this._user.chatId = chat.id;

            //             contact.addContact(this._user);

            //             console.info(`O contato ${email} foi adicionado.`);
            //             this.el.panelAddContact.hide();

            //         });

            //     }

            //     btn.disabled = false;

            // });

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

            //semelhante ao default, usado para não os eventos desse elemento não se 
            //propagarem para o evento pai
            event.stopPropagation();

            this.el.menuAttach.addClass('open');
            //Bind para passar o this dessa função para a outra
            document.addEventListener('click', this.closeMenuAttach.bind(this));

        });

        this.el.btnAttachPhoto.on('click', event => {

            // this.closeAllMainPanel();
            // this.el.panelMessagesContainer.show();
            this.el.inputPhoto.click();
            console.log('photo')

        });

        this.el.inputPhoto.on('change', event => {

            [...this.el.inputPhoto.files].forEach(file => {
                
                // Message.sendImage(this._activeContact.chatId, this._user.email, file);

            });

        });


        this.el.btnAttachCamera.on('click', event => {

            console.log('camera')
            this.closeAllMainPanel();
            this.el.panelMessagesContainer.hide();
            this.el.panelCamera.addClass('open');
            // this.el.panelCamera.sleep(100, () => {
            //     this.el.panelCamera.style.height = 'calc(100% - 120px)';
            // });
            this.el.panelCamera.css({
                'height': 'calc(100% - 120px)',
            });

            // this._cameraController = new CameraController(this.el.videoCamera);

        });


        this.el.btnClosePanelCamera.on('click', event => {

            // this._cameraController.stop();
            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();

        });


        this.el.btnTakePicture.on('click', event => {

            // let picture = this._cameraController.takePicture();

            // this.el.pictureCamera.src = picture;
            // this.el.pictureCamera.show();
            // this.el.videoCamera.hide();
            // this.el.btnReshootPanelCamera.show();
            // this.el.containerSendPicture.show();
            // this.el.containerTakePicture.hide();
            console.log('take-picture')

        });





        this.el.btnAttachDocument.on('click', event => {
            console.log('documento')
            this.closeAllMainPanel()
            // this.el.inputDocument.click();
             this.el.panelDocumentPreview.addClass('open');
             this.el.panelDocumentPreview.css({
                'height': 'calc(100% - 120px)',
            });


        });

        this.el.btnClosePanelDocumentPreview.on('click', event => {

            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();

        });


        this.el.btnSendDocument.on('click', event => {
            console.log('send document')
            // let documentFile = this.el.inputDocument.files[0];

            // if (documentFile.type === 'application/pdf') {

            //     Base64.toFile(this.el.imgPanelDocumentPreview.src).then(imageFile => {

            //         Message.sendDocument(this._activeContact.chatId, this._user.email, documentFile, imageFile, this.el.infoPanelDocumentPreview.innerHTML);

            //     });

            // } else {

            //     Message.sendDocument(this._activeContact.chatId, this._user.email, documentFile);

            // }

            // this.el.btnClosePanelDocumentPreview.click();

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

            this.startRecordMicrophoneTime();

        });


        this.el.btnCancelMicrophone.on('click', event => {

            this.closeRecordMicrophone();

        });

        this.el.btnFinishMicrophone.on('click', event => {

            // this._microphoneController.on('recorded', (file, metadata) => {

            //     Message.sendAudio(this._activeContact.chatId, this._user.email, file, metadata, this._user.photo);

            // });

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

            // Message.send(this._activeContact.chatId, this._user.email, 'text', this.el.inputText.innerHTML);

            // this.el.inputText.innerHTML = '';
            // this.el.panelEmojis.removeClass('open');
            console.log(this.el.inputText.innerHTML)

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

    startRecordMicrophoneTime() {

        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(() => {
            this.el.recordMicrophoneTimer.innerHTML = Format.toTime(Date.now() - start);
        }, 100);

        // this._microphoneController = new MicrophoneController();

        // this._microphoneController.on('ready', event => {

        //     this._microphoneController.startRecorder();

        // });

        // this._microphoneController.on('timer', (data, event) => {

        //     this.el.recordMicrophoneTimer.innerHTML = data.displayTimer;

        // });

    }

    closeRecordMicrophone() {

        // this._microphoneController.stopRecorder();

        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        clearInterval(this._recordMicrophoneInterval);

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