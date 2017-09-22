import fastifyServer from 'fastify';
import schemas from './schemas';
import routes from './routes';
import split2 from 'split2';

const stream = split2(JSON.parse);

const fastify = fastifyServer({
    logger: {
        level: 'info',
        stream: stream
    }
});

const opts = {
    schema: schemas
}

const shared = {
    db: 'xxx'
}

fastify.decorateRequest('verify', function() {
    this.isLoggedIn = true;
});

fastify.decorate('util', (req, key, value) => {
    req[key] = value;
});

fastify.decorate('random', () => {
    return Math.random()*1000;
})

fastify.addHook('preHandler', (req, reply, done) => {
    // req.verify();
    fastify.util(req, 'timestamp', new Date());
    done();
});

fastify.register(routes, shared, (err) => {
    if (err)
        throw err;
});

fastify.listen(3000, (err) => {
    if (err)
        throw err;
    console.log('Running at %s', fastify.server.address().port);
});