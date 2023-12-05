const petRoutes = require('./pets');

const appRouter = (app, fs) => {

    app.get('/', (req, res) => {
        res.send('JSON API');
      });

      petRoutes(app, fs);
};

module.exports = appRouter;