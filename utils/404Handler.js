function notFound(request, response) {
  response.status(404).send({
    success: false,
    message: '404: cannot find route'
  });
}

module.exports = app => {
  app.use(notFound);
};
