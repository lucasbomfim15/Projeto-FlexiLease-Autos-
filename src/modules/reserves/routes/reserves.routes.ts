import { Router } from "express";
import ReserveController from "../controllers/ReserveController";

const reserveRoutes = Router()
const reserveController = new ReserveController()

reserveRoutes.post('/reserve', reserveController.createReserve);
reserveRoutes.get('/reserve', reserveController.getAllReserves);
reserveRoutes.get('/reserve/:id', reserveController.getReserveById);
reserveRoutes.put('/reserve/:id', reserveController.updateReserve);
reserveRoutes.delete('/reserve/:id', reserveController.deleteReserve);

export default reserveRoutes;