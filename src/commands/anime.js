const discord = require('discord.js');
const scraper = require('mal-scraper');

const search = scraper.search.search

const searchOptions = {   //Opções de pesquisa
    maxResults:5
};

async function execute(client, message, args){
    let resposta;
    let anime = message.content.slice(7); // Tira a parte "*anime" do comando e deixa apenas o nome do anime
    searchOptions.term = anime; //Termo a ser procurado

    let info = await scraper.getInfoFromName(anime);
    //Verifica se existe algum anime com o nome digitado
    if(anime.toLowerCase() == info.title.toLowerCase()){  
        resposta = new discord.MessageEmbed()
                .setColor("RED")
                .setFooter(`Requisitado por ${message.author.tag}`, message.author.avatarURL({size: 32, format: 'png'}))
                .setTitle(info.title)
                .setThumbnail(info.picture)
                .setDescription(info.synopsis);
    }
    //Caso não haja retorna uma lista de animes com nomes parecidos
    else{let resultados = await search('anime', searchOptions); //Procura o anime e retorna um json
        let listaDeAnimes = [];
        for(id = 0; id < searchOptions.maxResults ; id++){
            listaDeAnimes.push(resultados[id].title);
        }
        resposta = `\nPossíveis animes: \n${listaDeAnimes}`
    }
    message.reply(resposta)
}

module.exports = {
    name: "anime",
    execute
}