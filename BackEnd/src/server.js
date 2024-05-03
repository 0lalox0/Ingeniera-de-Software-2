import express from 'express';
import { initDB } from '../config/db.js'

const app = express();


app.use(express.json());



app.get('/hello', (req, res) => {
    res.send('Hello');
});

app.listen(8000, () => {
    console.log('Server started at http://localhost:8000');
}   );


initDB()