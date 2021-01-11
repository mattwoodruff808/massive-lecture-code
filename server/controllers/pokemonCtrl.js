module.exports = {
    getCaughtPokemon: (req, res) => {
        const db = req.app.get('db');

        db.get_pokemon()
        .then(pokemon => res.status(200).send(pokemon))
        .catch(err => res.status(500).send(err));
    },
    catchPokemon: (req, res) => {
        //What does the handler function need from the client to work properly?
        const {pokemon} = req.body;
        //Get your db with req.app.get('db')
        const db = req.app.get('db');

        //Run the appropriate db query
        db.add_pokemon({name: pokemon.name, image: pokemon.image})
        .then(pokemon => res.status(200).send(pokemon))
        .catch(err => res.status(500).send(err));
    },
    editName: (req, res) => {
        const {id} = req.params;
        const {name} = req.body;
        const db = req.app.get('db');

        //You can shorthand it if the key and the value are the same exact name:
        db.update_name({name, id})
        .then(pokemon => res.status(200).send(pokemon))
        .catch(err => res.status(500).send(err));
    },
    releasePokemon: (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');

        db.release_pokemon(id)
        .then(pokemon => res.status(200).send(pokemon))
        .catch(err => res.status(500).send(err));
    }
}