import { Router, Request, Response } from "express";
import userController from "./controllers/user";
import petController from "./controllers/pet";



const routes = Router();


routes.get("/", (req : Request, res: Response) : any => {
    return res.send("rota de teste")
})


routes.post("/users",  (req : Request, res: Response) : any => userController.create(req, res))
routes.get("/users", (req : Request, res: Response) : any => userController.read(req, res))
routes.put("/users/:id", (req : Request, res: Response) : any => userController.update(req, res))
routes.delete("/users/:id", ((req : Request, res: Response) : any => userController.delete(req, res)))
routes.post("/login" , ((req : Request, res: Response) : any => userController.login(req, res)))

routes.post("/pets",  (req : Request, res: Response) : any => petController.create(req, res))
routes.get("/pets", (req : Request, res: Response) : any => petController.read(req, res))
routes.put("/pets/:id", (req : Request, res: Response) : any => petController.update(req, res))
routes.delete("/pets/:id", ((req : Request, res: Response) : any => petController.delete(req, res)))



export default routes;