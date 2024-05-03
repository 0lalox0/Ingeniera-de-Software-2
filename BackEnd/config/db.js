import mongoose from 'mongoose'

const DB_URI = 'mongodb://localhost:27017/db_inge2'

mongoose.set('strictQuery', false);

const initDB = () =>{
    const connect = () => {
        mongoose.connect(
            DB_URI,
            {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            (err) => {
                if(err){
                    console.log('DB: ERROR !!')
                } else {
                    console.log('Conexion correcta')
                }
            }
        )
    }

    connect()
}

export { initDB };