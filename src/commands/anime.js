const discord = require('discord.js');
const scraper = require('mal-scraper');

const search = scraper.search.search

const searchOptions = {   //Opções de pesquisa
    maxResults:5
};

async function execute(client, message, args){
    let resposta;
    if(args.length != 0){
        let anime = "";
        for(x = 0 ;x < args.length ; x++){ //junta as palavras do array
            anime += args[x];
            anime += " ";
        }
        console.log(anime)
        searchOptions.term = anime.trim(); //Termo a ser procurado (retirando os espaços em branco)
        let info = await scraper.getInfoFromName(anime.trim());
        //Verifica se existe algum anime com o nome digitado
        if(anime.trim().toLowerCase() == info.title.toLowerCase()){  
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
    else{
        message.reply("Escreva o nome de pelo menos um anime !")
    }
    
}

module.exports = {
    name: "anime",
    execute
}