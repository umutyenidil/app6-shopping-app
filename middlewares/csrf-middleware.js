const middleware = (incomingRequest, outgoingResponse, next) => {
    outgoingResponse.locals.csrfToken = incomingRequest.csrfToken();

    next();
};

module.exports = middleware;