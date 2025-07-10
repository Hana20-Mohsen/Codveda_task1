// import { Router } from "express";
import cors from "cors";
import postController from './modules/post/post.controller.js'
const bootstrap=(app , experss)=>{
    app.use(experss.json());
    const allowedOrigins=[
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:5500",


    ]
    app.use(cors({
        origin:(origin , callback)=>{
            if(!origin || allowedOrigins.includes(origin)){
                 callback(null, true);
            }else{
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials:true
    }))

    app.get('/' , (req , res , next)=>{
        res.status(200).json({
            message:'welcome to the backend server'
        })
    })

    app.use('/api/posts' , postController)

    app.all('*' , (req , res , next)=>{
        res.status(404).json({
            status:'error',
            message:'not found'
        })
    })

}

export default bootstrap;