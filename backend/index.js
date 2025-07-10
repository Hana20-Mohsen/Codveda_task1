import express from "express";
import bootstrap from "./src/app.controller.js";
import * as dotenv from 'dotenv'
import path from 'path';
const app = express();
dotenv.config({path: path.resolve('./src/config/.env')});
const port = process.env.PORT || 8000;

bootstrap(app , express);
app.listen(port , ()=>{
    console.log(`server is running on port ${port}`);
    
})

