import { Request, Response } from 'express';
import CreateReserveService from '../services/CreateReserveService';
import ListReserveService from '../services/ListReserveService';
import ShowReserveService from '../services/ShowReserveService';
import AppError from '@shared/errors/AppError';
import UpdateReserveService from '../services/UpdateReserveService';
import DeleteReserveService from '../services/DeleteReserveService';


export default class ReserveController {
    async createReserve(req: Request, res: Response): Promise<Response> {
        const createReserve = new CreateReserveService()
        try {
            const reserve = await createReserve.createReserve(req.body);
            return res.status(201).json(reserve);
        } catch (error) {
            return res.status(400).json(new AppError("Falha ao criar reserva"));
        }    
}

    async getAllReserves(req: Request, res: Response): Promise<Response> {
        const  reserveService = new ListReserveService();
        try {
            const reserves = await reserveService.getAllReserves();
            return res.status(200).json(reserves);
        } catch (error) {
            return res.status(400).json({error: 'Falha ao listar Reservas'});
        }
    }


    async getReserveById(req: Request, res: Response): Promise<Response> {
        const  showReserve = new ShowReserveService();

        try {
            const reserve = await showReserve.getReserveById(req.params.id);
            if (reserve) {
                return res.status(200).json(reserve);
            } else {
                return res.status(404).json({ error: 'Reserva não encontrada' });
            }
        } catch (error) {
            return res.status(400).json({ error: 'Falha ao listar sua Reserva' });
        }
    }


    async updateReserve(req: Request, res: Response): Promise<Response> {
        const updateReserve = new UpdateReserveService();
        try {
            const reserve = await updateReserve.updateReserve(req.params.id, req.body);
            if (reserve) {
                return res.status(200).json(reserve);
            } else {
                return res.status(404).json({ error: 'Reserva não encontrada' });
            }
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar sua reserva' });
        }
    }


    async deleteReserve(req: Request, res: Response): Promise<Response> {
        const deleteReserve = new DeleteReserveService();
        try {
            const reserve = await deleteReserve.deleteReserve(req.params.id);
            if (reserve) {
                return res.status(200).json({ message: 'Reserva excluída com sucesso' });
            } else {
                return res.status(404).json({ error: 'Reserva não encontrada' });
            }
        } catch (error) {
            return res.status(400).json({ error: 'Falha ao deletar sua reserva' });
        }
    }

}