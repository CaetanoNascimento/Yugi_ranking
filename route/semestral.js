const route = require( 'express' ).Router();
const controller = require( '../controllers/semestral-control' );

route.get( '/', ( req, res ) => {
    res.sendFile( __basedir + '/public/pages/semestral.html' );
} )

route.post( '/', controller.postSemestral );

route.get( '/:id_organizador', controller.getSemestral);

module.exports = route;