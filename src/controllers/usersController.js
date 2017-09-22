let proceed = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 2000, {'step': 'proceeded'});
    });
}

let execute = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 2000, {'step': 'executed'});
    });
}

let result = (result) => {
    return new Promise(resolve => {
        setTimeout(resolve, 2000, {'success': result.step});
    });
}

export default {
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
        let finalResult = await result(executionResult);
        return finalResult;
    }
}