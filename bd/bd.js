import mongoose from "mongoose"
import 'dotenv/config'

async function conectarBD(){
    try{
        const respuestaMongo = await mongoose.connect(process.env.SECRET_MONGO) // 
        //mongoose.conect("mongodb://localhost:27017/backend1") // Este es para trabajar de manera local con el servidor
        console.log("Conexion con MongoDB Atlas")
    }
    catch(err){
        console.log("Error " + err)
    }
}

export default conectarBD

