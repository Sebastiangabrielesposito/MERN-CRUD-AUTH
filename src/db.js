import mongoose from 'mongoose'
import config from './config.js'

const URL_MONGO = config.URL_MONGO

// mongoose.set("strictQuery", true);
try{
    await mongoose.connect(URL_MONGO)
    console.log('Connected DataBase');
}catch(error){
    console.log(error);
}