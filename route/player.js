const route = require( 'express' ).Router();
const controller = require( '../controllers/player-control' );

route.get( '/:id_semestral', ( req, res ) => {
    res.sendFile( __basedir + '/public/pages/player.html' );
} )

route.post( '/', controller.postPlayer );

route.get( '/buscar/:id_semestral', controller.getPlayers);

route.get( '/round/:player', controller.getPlayersdoRound);

route.get( '/rank/:id_player', controller.getPlayersRank);

route.patch( '/atualizar/:deck/:player/:id_semestral', controller.patchPlayer );

module.exports = route;