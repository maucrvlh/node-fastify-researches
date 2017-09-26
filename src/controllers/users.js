let proceed = () => {
    return Promise.resolve({'step': 'proceeded'});
}

let execute = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 2000, {'data': 'executed'});
    });
}

let getUsersList = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 1, {'data': [{a:1}, {a:2}]});
    });
}

let result = (result) => {
    return Promise.resolve({'status': 'success', 'records': result.data});
}

export default {
    v1: {
        getList: function(request, reply) {
            reply.send({modo: 'controller importado'});
        },
        withLogging: function(request, reply) {
            request.log.info('get no /log. :)');
            reply.send({modo: 'with logging'});
        },
        promise: async function(request, reply) {
            return await new Promise(resolve => {
                setTimeout(resolve, 2000, {mode: 'promise'});
            })
        },
        chained: async function(request, reply) {
            await proceed();
            let executionResult = await execute();
            let finalResult = await result(executionResult);
            return finalResult;
        },
        
        decorate: (request, reply) => {
            reply.send(fastify.random);
        },
        
        withOptions: (options, request, reply) => {
            reply.send({mode: 'options', options: options});
        },

        optionsPromise: async function () {
            await proceed();
            let executionResult = await execute();
            let response = await result(executionResult);
            return response;
        },

        usersList: {
            schema: {
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        token: { type: 'number' }
                    }
                }
            },        
            handler: async function () {
                await proceed();
                let list = await getUsersList();
                let response = await result(list);
                return response;
            }
        },
        genError: {
            handler: function (request, reply) {
                console.log(reply.store);
                reply.code(501);
                reply.send(new Error('não foi.'));
            }
        }
    }
}