import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import {router} from './routes/routes.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const location = path.join(__dirname ,'Uploads');
console.log(location);


const app = express();
 mongoose.connect("mongodb+srv://Gaurav:xEfXL8h3NI4PHpHJ@practicedb1.rznqqci.mongodb.net/AirBnB?retryWrites=true&w=majority&appName=PracticeDB1")
 .then(()=> console.log("Connected to Database"));

app.use(express.json());
app.use(cors());
app.use('/Uploads', express.static(location));
app.get("/", (req, res)=>{
    res.send("server is working here");
});

app.use('/api', router);

app.listen(3000, ()=>{
    console.log("server is listen on PORT 3000");
})
