import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app=express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.urlencoded({ extended: true,limit:"16kb" }));
app.use(express.static("public"));
app.use(cookieParser())

// Importing routes
import userRouter from './routes/user.routes.js';
// app.use(express.json()); agar hm router.post direct waha ye zarur use krena hoga q ki  to hme batana hoga expresss ko ki data json se aa rahi hai use samjho name ho gya email password wagera
// routes declaration

app.use('/api/v1/users', userRouter);
//http://localhost:8000/api/v1/users/register

export {app}