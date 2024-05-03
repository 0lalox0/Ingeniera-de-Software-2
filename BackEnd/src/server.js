import express from 'express';

const app = express();
app.use(express.json());



app.get('/hello', (req, res) => {
    res.send('Hello');
});

app.listen(8000, () => {
    console.log('Server started at http://localhost:8000');
}   );