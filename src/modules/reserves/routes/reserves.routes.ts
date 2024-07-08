import { Router } from "express";
import ReserveController from "../controllers/ReserveController";
import authMiddleware from "@shared/middlewares/authMiddleware";

const reserveRoutes = Router()
const reserveController = new ReserveController()

reserveRoutes.post('/reserve', authMiddleware,reserveController.createReserve);
reserveRoutes.get('/reserve', authMiddleware,reserveController.getAllReserves);
reserveRoutes.get('/reserve/:id',authMiddleware, reserveController.getReserveById);
reserveRoutes.put('/reserve/:id',authMiddleware, reserveController.updateReserve);
reserveRoutes.delete('/reserve/:id',authMiddleware, reserveController.deleteReserve);

export default reserveRoutes;