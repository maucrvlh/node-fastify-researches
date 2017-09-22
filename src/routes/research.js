import usersController from '../controllers/users';

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
            usersController.withOptions(options, request, reply);
        });

        fastify.get('/optpromise', async function(request, reply) {
            // passando apenas a execução da requisição e retornando um promise
            return await usersController.optionsPromise(options);
        });
        
        fastify.get('/imported', usersController.getList);
        fastify.get('/log', usersController.withLogging);
        fastify.get('/promise', usersController.promise);
        fastify.get('/chained', usersController.chained);
        fastify.get('/decorate', usersController.decorate);

        fastify.route({
            method: 'GET',
            url: '/users/:id/info',
            schema: usersController.usersList.schema,
            handler: usersController.usersList.handler
        });

        fastify.route({
            method: 'GET',
            url: '/error',
            handler: usersController.genError.handler
        });

        next();
    }
}