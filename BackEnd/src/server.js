import express from 'express';
const app = express();
const initDB = require('../config/db')


app.use(express.json());



app.get('/hello', (req, res) => {
    res.send('Hello');
});

app.listen(8000, () => {
    console.log('Server started at http://localhost:8000');
}   );



//inicializacion de la base de datos
initDB()