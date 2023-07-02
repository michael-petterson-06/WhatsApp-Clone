class WhatsAppController {
  
    constructor() {
        console.log('WhatsAppController ok')

        this.loadElements();
    }

    loadElements() {

      this.el = {};

      document.querySelectorAll('[id]').forEach(element => {
        //Faço um for em todos os ids, criando uma função para transforma-los
        // em camelcase e passo o elemento para referenciar o id
          this.el[Format.getCamelcase(element.id)] = element;

      });

    }

}