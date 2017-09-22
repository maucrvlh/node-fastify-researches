import fastify from './config/fastify';

fastify.listen(3000, (err) => {
    if (err)
        throw err;
    console.log('Running at %s', fastify.server.address().port);
});