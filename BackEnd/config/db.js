const mongoose = require('mongoose')

const DB_URI = 'mongodb://localhost:27017/db_inge2'

module.exports = () =>{
    const connect = () => {
        mongoose.connect(
            DB_URI,
            {
                keepAlive: true,
                useNewParser: true,
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

