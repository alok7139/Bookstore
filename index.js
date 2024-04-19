import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import bookroute from './route/bookroute.js'
import userroute from './route/userroute.js'
import cors from 'cors';

// import path from 'path'
// import { fileURLToPath } from 'url';



// resolvinf dirname for es module
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename);
// console.log(__dirname);


const app = express();
dotenv.config();
app.use(cors());



app.use(express.json());



//use the client app
// app.use(express.static(path.join(__dirname , '/client' , )))

const mongourl = process.env.MONGO_URL;




//  connect to mongodb
try {
    mongoose.connect(mongourl , {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
    console.log('connected to database')
} catch (error) {
    console.log('error' , error);
}

// route
app.use('/book' , bookroute);
app.use('/user' , userroute);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
}) 
