module.exports.get404 = (incomingRequest, outgoingResponse) => {
    outgoingResponse.status(404);
    outgoingResponse.render('404', {
      title: '404 Error'
    });
  };