const express = require('express');
const fetch = require('node-fetch');

const Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

const router = express.Router();

router.get('/:pokemon', async (req, res) =>{
    try {
        let pokemon = req.params.pokemon.toLowerCase();
        pokemon = pokemon.split(' ').join('-');

        //use pokemon api to get data.
        P.getPokemonByName(pokemon)
        .then(function(response){
            //Find way to send multiple HTTP resquest objects to client.
            let pokemonData = response;
            res.send(pokemonData);
        })
        .catch(function(error) {
            res.status(404).json({
                message: "Pokemon could not be found"
            });
        });

    }
    catch(error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
});

module.exports = router;