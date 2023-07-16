import app from './app.js'
import config from './config.js'
import "./db.js";
import express from 'express';

const PORT = config.PORT

app.listen(PORT,() => {
    console.log(`Server on port ${PORT}`);
})