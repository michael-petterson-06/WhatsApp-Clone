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


     
    }

    closeAllLeftPanel() {
        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide()
    }

}