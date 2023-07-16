import express from "express"
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import tasksRoutes from './routes/tasks.routes.js'
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()


app.use(
  cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ['set-cookie'],
  })
);
app.use(cookieParser());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });


app.use('/api',authRoutes)
app.use('/api', tasksRoutes)
app.get('/',(req,res)=>{
    res.send('Welcome')
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
  });



export default app
