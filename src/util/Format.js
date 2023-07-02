class Format {

  //Não precisa de construtor porque só vou cirar métodos estáticos
  static getCamelcase(text) {

      let div = document.createElement('div');
      //data-set converte o id para camelcase
      div.innerHTML = `<div data-${text}="id"></div>`;
      
      return Object.keys(div.firstChild.dataset)[0];

  }

}