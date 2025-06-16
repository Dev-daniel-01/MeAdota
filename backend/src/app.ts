import routes from "./routes"
import cors from 'cors'
import express from 'express'

const app = express();


app.use(express.json())


app.use(express.urlencoded({extended: true}))

app.use(cors())


app.use(routes)

export default app;