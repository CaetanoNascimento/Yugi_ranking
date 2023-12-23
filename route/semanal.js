const route = require( 'express' ).Router();
const controller = require( '../controllers/semanal-control' );

route.get( '/', ( req, res ) => {
    res.sendFile( __basedir + '/public/pages/semanal.html' );
} )

route.get( '/rank', ( req, res ) => {
    res.sendFile( __basedir + '/public/pages/semanal_rank.html' );
} )

route.post( '/', controller.postSemanal );

route.get( '/:id_organizador', controller.getSemanal);

route.get( '/ranked/:id_semanal', controller.getRankSemanal);

route.get( '/player/:id_player', controller.getRankplayer);

route.post( '/ranking', controller.postRanking );

route.patch('/atualizar/:id_player/:pontos/:id_semanal', controller.patchRank)

module.exports = route;