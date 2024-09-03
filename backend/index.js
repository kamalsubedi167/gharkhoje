import express from 'express';
import dotenv from "dotenv";
import {PrismaClient} from "@prisma/client";
import cors from "cors";
import routes from './src/routes/routes.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());



app.use("/api",routes);




app.listen(port,()=>{
    console.log("Server is listening on port http://localhost:"+port);
})




