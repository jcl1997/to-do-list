import express, { Express } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import routes from "./routes";

dotenv.config();

const app: Express = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, "build")));

app.use("/", routes);

app.listen(port, () => {
  // tslint:disable-next-line
  console.log(
    `⚡️[server]: Server is running at http://localhost:${port}`,
  );
});
