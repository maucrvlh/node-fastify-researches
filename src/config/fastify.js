import fastifySetup from 'fastify';
// import schemas from '../schemas';
import routes from '../routes/all';
import split2 from 'split2';

const stream = split2(JSON.parse);

const fastify = fastifySetup({
    logger: {
        level: 'info',
        stream: stream
    }
});

// const opts = {
//     schema: schemas
// }

const shared = {
    db: 'xxx'
}

fastify.decorateRequest('verifyAuthentication', function() {
    this.isLoggedIn = true;
});

fastify.addHook('preHandler', (req, reply, done) => {
    // este código executa a cada requisição, indistintamente

    // req.verifyAuthentication();    
    // setTimeout(done,1000);
    done();
});

fastify.register(routes.users.v1, { prefix: '/api/v1' });

fastify.extendServerError((error) => {
    console.log('Error: %s', error)
    return {
        status: 'error',
        error: 'overwrited',
        timestamp: Date.now()
    }
});

export default fastify;