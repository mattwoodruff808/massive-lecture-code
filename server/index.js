require('dotenv').config();
const express = require('express');
const massive = require('massive');
const grassCtrl = require('./controllers/grassCtrl');
const pokeCtrl = require('./controllers/pokemonCtrl');
const {SERVER_PORT, CONNECTION_STRING} = process.env;
const app = express();

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected');
});

//grassCtrl endpoints
app.get('/api/wild-pokemon', grassCtrl.getWildPokemon);

//pokeCtrl endpoints
app.get('/api/caught-pokemon', pokeCtrl.getCaughtPokemon);
app.post('/api/caught-pokemon', pokeCtrl.catchPokemon);
app.put('/api/caught-pokemon/:id', pokeCtrl.editName);
app.delete('/api/caught-pokemon/:id', pokeCtrl.releasePokemon);

app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`));