import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.get('/users', userController.getAll.bind(userController));
router.post('/users', userController.create.bind(userController));

export default router;