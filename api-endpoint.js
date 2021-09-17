const baseUrl ='https://pokeapi.co/api/v2/pokemon/';

function getElement(element){
    return document.querySelector(element);// queryselector é utilizado para 
}

const searchInput = getElement('.search-input'),//const é uma variavel que nao pode mudar o valor 
      searchButton = getElement('.search-button'),
      container = getElement('.pokemon'),
      erroMenssage = getElement('.error');

//var é uma variavel que pode mudar o valor conforme o codigo 
var pokeName,//responsavel por pegar o numero ou nome passado na caixa de busca
pokemon,//guarda os dados recebidos pela API 
card;//Responsavel por cuidar do html

// fetch('https://pokeapi.co/api/v2/pokemon/mew')
// .then(response => response.json())//recebe a resposta da requisição
// .then(data=>console.log(data))//transformada em json imprimimos no console
// .catch(err=>console.log(err));//executa caso exista algum erro 
//O fetch devolve uma promessa de que algo será retornado, essa promessa é chamada de
//Promisse. Essa promessa pode tanto ser boa, ter retornado os dados, quanto ter falhado por
//algum motivo - como no caso da conexão com o servidor cair.


// usada para diminuição da escrita para utilizar os elementos HTML 
function getElement(element){
    return document.querySelector(element);
}

//faz a requisição para API e mostra na tela as respostas 
function requestPokeInfo(url,name){
    fetch(url+name)
    .then(response=>response.json())
    .then(data=>{
        pokemon = data;
    })
    .catch(err => console.log(err))
    console.log(pokemon);
}


searchButton.addEventListener('click',event =>{
    event.preventDefault();
    pokeName = searchInput.value.toLowerCase();
    //antes de utilizarmos a API precisamos estudar como ela envia as variaveis para evitar futuros bugs 
    // no caso colocamos no lower case pois a API só aceita lowercase
    startApp(pokeName);

} );

function createCard () {
    card = `
      <div class="pokemon-picture">
        <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
      </div>
      <div class="pokemon-info">
          <h1 class="name">Name: ${pokemon.name}</h1>
          <h2 class="number">Nº ${pokemon.id}</h2>
          <h3 class="type">Type: ${pokemon.types.map(item => ' ' + item.type.name).toString()}</h3>
          <h3 class="skill">Skills: ${pokemon.moves.map(item => ' ' + item.move.name).toString()}</h3>
          <h3 class="weight">Weight: ${pokemon.weight  / 10}kg</h3>
          <h3 class="height">Height: ${pokemon.height  / 10}m</h3>
      </div>`;
    return card;
  }

function startApp(pokeName) {
    requestPokeInfo(baseUrl, pokeName);
  
    // A função que cria o HTML só será executada 2 segundos depois que a função startApp for executada
    setTimeout(function () {
        container.innerHTML = createCard();
    }, 2000);
  }
