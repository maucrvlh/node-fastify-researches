import users from '../controllers/users';

export default {
    v1: (fastify, options, next) => {
        fastify.get('/normal', function(request, reply) {
            reply.send({modo: 'normal'});
        });

        fastify.get('/req', function(request, reply) {
            reply.send({modo: 'req'});
        });

        fastify.get('/shared', function(request, reply) {
            reply.send({modo: 'shared', options: options});
        });

        fastify.get('/async', async function (request, reply) {
            // retornando uma promise local
            var someAsyncData = await new Promise((resolve, rejct) => {
                    setTimeout(resolve, 1000, {modo: "async/await"});
            });
            return someAsyncData;
        });

        fastify.get('/options', function(request, reply) {
            // passando o controle da requisição para um método no userController
            users.v1.withOptions(options, request, reply);
        });

        fastify.get('/optpromise', async function(request, reply) {
            // passando apenas a execução da requisição e retornando um promise
            return await users.v1.optionsPromise(options);
        });
        
        fastify.get('/imported', users.v1.getList);
        fastify.get('/log', users.v1.withLogging);
        fastify.get('/promise', users.v1.promise);
        fastify.get('/chained', users.v1.chained);
        fastify.get('/decorate', users.v1.decorate);

        fastify.route({
            method: 'GET',
            url: '/users/:id/info',
            schema: users.v1.usersList.schema,
            handler: users.v1.usersList.handler
        });

        fastify.route({
            method: 'GET',
            url: '/error',
            handler: users.v1.genError.handler
        });

        next();
    }
}