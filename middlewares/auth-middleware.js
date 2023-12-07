const middleware = (incomingRequest, outgoingResponse, next) => {
    if (!incomingRequest.user) {
        return outgoingResponse.redirect('/auth/login');
    }

    next();
};

module.exports = middleware;