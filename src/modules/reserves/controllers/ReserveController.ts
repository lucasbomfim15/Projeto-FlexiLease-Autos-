import { Request, Response } from 'express';
import CreateReserveService from '../services/CreateReserveService';
import ListReserveService from '../services/ListReserveService';
import ShowReserveService from '../services/ShowReserveService';
import AppError from '@shared/errors/AppError';
import UpdateReserveService from '../services/UpdateReserveService';
import DeleteReserveService from '../services/DeleteReserveService';


export default class ReserveController {
    /**
   * @swagger
   * /api/v1/reserve:
   *   post:
   *     summary: Create a new reserve
   *     tags: [Reserves]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - start_date
   *               - end_date
   *               - id_car
   *               - id_user
   *             properties:
   *               start_date:
   *                 type: string
   *               end_date:
   *                 type: string
   *               id_car:
   *                 type: string
   *               id_user:
   *                 type: string
   *               
   *     responses:
   *       201:
   *         description: reserve created successfully
   *       400:
   *         description: Invalid input
   */
    async createReserve(req: Request, res: Response): Promise<Response> {
        const createReserve = new CreateReserveService()
        try {
            const reserve = await createReserve.createReserve(req.body);
            return res.status(201).json(reserve);
        } catch (error) {
            console.log(error)
            return res.status(400).json(new AppError("Falha ao criar reserva"));
        }    
}

/**
   * @swagger
   * /api/v1/reserve:
   *   get:
   *     summary: List all reserves
   *     tags: [Reserves]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: A list of reserves
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Reserve'
   *       400:
   *         description: Failed to list reserves
   */

    async getAllReserves(req: Request, res: Response): Promise<Response> {
        const  reserveService = new ListReserveService();
        try {
            const reserves = await reserveService.getAllReserves();
            return res.status(200).json(reserves);
        } catch (error) {
            return res.status(400).json({error: 'Falha ao listar Reservas'});
        }
    }

   /**
   * @swagger
   * /api/v1/reserve/{id}:
   *   get:
   *     summary: Get a reserve by ID
   *     tags: [Reserves]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The reserve ID
   *     responses:
   *       200:
   *         description: The reserve data
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Reserve'
   *       404:
   *         description: Reserve not found
   */

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

/**
   * @swagger
   * /api/v1/reserve/{id}:
   *   put:
   *     summary: Update a reserve by ID
   *     tags: [Reserves]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The reserve ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Reserve'
   *     responses:
   *       200:
   *         description: Reserve updated successfully
   *       404:
   *         description: Reserve not found
   */
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

    /**
   * @swagger
   * /api/v1/reserve/{id}:
   *   delete:
   *     summary: Delete a reserve by ID
   *     tags: [Reserves]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The reserve ID
   *     responses:
   *       200:
   *         description: Reserve deleted successfully
   *       404:
   *         description: Reserve not found
   */
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