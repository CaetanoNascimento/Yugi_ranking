const route = require( 'express' ).Router();
const controller = require( '../controllers/matchs-control' );

route.get( '/:id_semanal', ( req, res ) => {
    res.sendFile( __basedir + '/public/pages/matchs.html' );
} )

route.post( '/', controller.postMatch );

route.get( '/buscar/:id_semestral', controller.getRound);

route.get( '/rodadas/:id_rodada/:id_semanal', controller.getRodada);

route.post( '/rodada', controller.postRodada );

module.exports = route;