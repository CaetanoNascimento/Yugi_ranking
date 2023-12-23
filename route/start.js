const route = require( 'express' ).Router();
const controller = require( '../controllers/start-control' );

route.get( '/', ( req, res ) => {
    res.sendFile( __basedir + '/public/pages/start.html' );
} )





module.exports = route;