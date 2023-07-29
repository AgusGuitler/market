const express = require('express');
const routerApi = require('./routes')

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola, mi srv en express');
})

app.get('/home', (req, res) => {
  res.send('Welcome to my website');
})

routerApi(app);

app.listen(port, () => {
  console.log('Mi port ' + port);
})
