const route = require( 'express' ).Router();
const controller = require( '../controllers/ranking-control' );

route.get( '/:id_rank', ( req, res ) => {
    res.sendFile( __basedir + '/public/pages/ranking.html' );
} )

route.get( '/particular', ( req, res ) => {
    res.sendFile( __basedir + '/public/pages/ranking_pessoal.html' );
} )

route.get( '/ranked/:id_rank', controller.getRankSemestral);

route.post( '/ranker', controller.postRanking );

route.patch('/atualizar/:id_player/:pontos', controller.patchRank)

module.exports = route;