import { Router } from 'express';
import { LaborarityServiceController } from '~/controllers/laborarity_service.controller';
import wrapRequestHandler from '~/utils/handle';

export function createLaborarityRouter(): Router {
  const router = Router();
  const laborarityServiceController = new LaborarityServiceController();

  router.get('/:id', wrapRequestHandler(laborarityServiceController.getById.bind(laborarityServiceController)));

  router.post('/', wrapRequestHandler(laborarityServiceController.postCreate.bind(laborarityServiceController)));

  router.get('/', wrapRequestHandler(laborarityServiceController.getAll.bind(laborarityServiceController)));

  router.put('/:id', wrapRequestHandler(laborarityServiceController.putUpdate.bind(laborarityServiceController)));

  router.delete('/:id', wrapRequestHandler(laborarityServiceController.delete.bind(laborarityServiceController)));

  return router;
}