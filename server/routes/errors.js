module.exports = function (app) {

  // 404s
  app.use(function (req, res, next) {
    if (req.accepts('html')) {
      return res.status(404).send("<h2>I'm sorry, I couldn't find that page.</h2>");
    }

    if (req.accepts('json')) {
      return res.status(404).json({ error: 'Not found' });
    }

    // default response type
    res.type('txt');
    res.status(404).send("Hmmm, couldn't find that page.");
  })

   // 500
  app.use(function (err, req, res, next) {
    console.error('error at %s\n', req.url, err.stack);
    res.status(500).send("Oops, we made a boo boo.");
  })
}
