import { Request, Response } from 'express';
import AuthServices from '../services/AuthServices';

export default class AuthController {

  /**
   * @swagger
   * /api/v1/auth:
   *   post:
   *     summary: Authenticate user and return a JWT token
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 example: user@example.com
   *               password:
   *                 type: string
   *                 example: password123
   *     responses:
   *       200:
   *         description: Authentication successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *                 token:
   *                   type: string
   *       401:
   *         description: Invalid email or password
   */
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUser = new AuthServices();

    try {
      const { user, token } = await authenticateUser.execute({ email, password });
      return res.json({ user, token });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Failed to authenticate user' });
    }
  }
}
