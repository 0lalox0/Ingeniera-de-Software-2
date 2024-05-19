import fs from 'fs';
import admin from 'firebase-admin';
import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRoute.js'
import sucursalRouter from './routes/sucursalRoute.js'
import cors from 'cors';
import uploadImage from './uploadImage.cjs'
import prodIntercambiosRouter from './routes/prodIntercambioRoute.js'
//Couldinary
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dr05fh5qy', 
  api_key: '175555578283967', 
  api_secret: 'tpDsgs61QWeIFeIOe4Pm8E_Hu3o' 
});
//mongodb connection
dotenv.config()
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error(error))

//Credenciales de Firebase
const credentials = JSON.parse(
  fs.readFileSync('./credentials.json')
);
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});


const app = express();

app.use(express.json());
app.use(cors());
//Middleware que verifica el token
app.use(async (req, res, next) => {
  const { authtoken } = req.headers;
  if (authtoken) {
    try {
      req.user = await admin.auth().verifyIdToken(authtoken);
    } catch (e) {
      res.sendStatus(400);
    }

  }

  next();

});

//middleware de las rutas para la base de datos
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', sucursalRouter)
app.use('/api', prodIntercambiosRouter)
//Cloudinary
app.post("/SubirImagen", (req, res) => {
  uploadImage(req.body.image)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
});

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