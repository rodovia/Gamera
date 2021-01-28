const discord = require('discord.js');
const scraper = require('mal-scraper');

const search = scraper.search.search


const searchOptions = {   //Opções de pesquisa
    maxResults : 10 
};


async function execute(client, message, args){
    let anime = message.content.slice(7); // Tira a parte "*anime" do comando e deixa apenas o nome do anime
    searchOptions.term = anime; //Termo a ser procurado
    let resultados = await search('anime', searchOptions); //Procura o anime e retorna um json
    let listaDeAnimes = [];
    for(id = 0; id < resultados.length ; id++){
        listaDeAnimes.push(resultados[id].title);
    }
    console.log(listaDeAnimes);
    message.reply(listaDeAnimes);
    
}

module.exports = {
    name: "anime",
    execute
}