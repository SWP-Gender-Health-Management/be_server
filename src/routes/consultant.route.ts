import { Router } from 'express'
import { ConsultantController } from '~/controllers/consultant.controller'
import wrapRequestHandler from '~/utils/handle'

export function createConsultantRouter(): Router {
  const router = Router();
  const consultantServiceController = new ConsultantController();

  router.get('/:id', wrapRequestHandler(consultantServiceController.getById.bind(consultantServiceController)));

  router.post('/', wrapRequestHandler(consultantServiceController.postCreate.bind(consultantServiceController)));

  router.get('/', wrapRequestHandler(consultantServiceController.getAll.bind(consultantServiceController)));

  router.put('/:id', wrapRequestHandler(consultantServiceController.putUpdate.bind(consultantServiceController)));

  router.delete('/:id', wrapRequestHandler(consultantServiceController.delete.bind(consultantServiceController)));

  return router;
}