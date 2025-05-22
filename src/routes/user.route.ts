import { Router } from 'express';
import  userController  from '../controllers/user.controller';

const router = Router();

router.get('/users', userController.getAll.bind(userController));
router.post('/users', userController.create.bind(userController));
router.delete('/users', userController.delete.bind(userController));

export default router;