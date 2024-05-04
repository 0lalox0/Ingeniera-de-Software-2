import express from 'express';
const app = express();
import { initDB } from '../config/db'


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
}   );



//inicializacion de la base de datos
initDB()