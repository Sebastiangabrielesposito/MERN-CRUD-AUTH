import app from './src/app.js'
import config from './src/config.js'
import "./src/db.js";
import express from 'express';

const PORT = config.PORT

app.listen(PORT,() => {
    console.log(`Server on port ${PORT}`);
})