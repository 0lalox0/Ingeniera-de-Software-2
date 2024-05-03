import express from 'express';

const app = express();
const initDB = require('../config/db')


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello');
});

app.post('/api/test', (req, res) => { //test boton Hola
   // res.send('Hello');
   console.log("TESTTEO BACKEND")
   console.log(req.body);
});
app.listen(8000, () => {
    console.log('Server started at http://localhost:8000');
});
app.use((req, res, next) => {  //todo esto
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  };
  app.use(errorHandler);