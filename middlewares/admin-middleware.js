const middleware = (incomingRequest, outgoingResponse, next) => {
    console.log('admin middleware');

    console.log(incomingRequest.user);

    next();
};

module.exports = middleware;