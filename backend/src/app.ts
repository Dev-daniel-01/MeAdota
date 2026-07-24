import routes from "./routes"
import cors from 'cors'
import express from 'express'

const app = express();


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cors())

app.use(routes)

export default app;