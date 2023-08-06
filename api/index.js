const express = require('express');
const routerApi = require('./routes')
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorhandlers');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
  res.send('Hola, mi srv en express');
})

app.get('/api/home', (req, res) => {
  res.send('Welcome to my website');
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port ' + port);
})
