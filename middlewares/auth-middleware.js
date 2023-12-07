const middleware = (incomingRequest, outgoingResponse, next) => {
    if (!incomingRequest.user) {
        incomingRequest.session.redirectTo = incomingRequest.url;
        return outgoingResponse.redirect('/auth/login');
    }

    next();
};

module.exports = middleware;