import express, { Express } from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import bodyParser from 'body-parser'

import routes from "./routes";

dotenv.config();

const app: Express = express();

app.use(cors({origin: '*'}));
app.use(bodyParser.json());
const port = process.env.PORT;

app.use("/", routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});