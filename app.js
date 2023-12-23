const express = require( 'express' );
const app = express();

const bodyparser = require( 'body-parser' );

global.__basedir = __dirname;

app.use( bodyparser.urlencoded( { extended: false } ) );
app.use( bodyparser.json() );
app.use( express.json() );



app.use( express.static( __dirname + '/public' ) );
app.use( '/uploads', express.static( 'uploads' ) );
app.use( '/public', express.static( __dirname + 'public' ) );
app.use( '/css', express.static( __dirname + 'public/css' ) );
app.use( '/js', express.static( __dirname + 'public/js' ) );
app.use( '/img', express.static( __dirname + 'public/img' ) );


app.get('/', (req, res) => {
    res.sendFile(__dirname + ('/index.html'))
})

app.get('/organizador', (req, res) => {
    res.sendFile(__dirname + ('/public/pages/organizador.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + ('/public/pages/login.html'))
})


const rotaRanking = require('./route/ranking');

const rotaStart = require('./route/start');

const rotaRegister = require('./route/register');

const rotaPlayer = require('./route/player');

const rotaSemestral = require('./route/semestral');

const rotaSemanal = require('./route/semanal');

const rotaMatchs = require('./route/matchs');


app.use('/matchs', rotaMatchs);

app.use('/semanal', rotaSemanal);

app.use('/semestral', rotaSemestral);

app.use('/player', rotaPlayer);


app.use('/register', rotaRegister);
app.use('/start', rotaStart);
app.use('/ranking', rotaRanking);

module.exports = app