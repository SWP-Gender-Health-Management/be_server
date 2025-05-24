import { Router } from 'express'
import consultantController from '~/controllers/consultant.controller'
import wrapRequestHandler from '~/utils/handle'

// export function createConsultantRouter(): Router {
//   const router = Router();
//   const consultantServiceController = new ConsultantController();

//   router.get('/:id', wrapRequestHandler(consultantServiceController.getById.bind(consultantServiceController)));

//   router.post('/', wrapRequestHandler(consultantServiceController.postCreate.bind(consultantServiceController)));

//   router.get('/', wrapRequestHandler(consultantServiceController.getAll.bind(consultantServiceController)));

//   router.put('/:id', wrapRequestHandler(consultantServiceController.putUpdate.bind(consultantServiceController)));

//   router.delete('/:id', wrapRequestHandler(consultantServiceController.delete.bind(consultantServiceController)));

//   return router;
// }

  const consultantRouter = Router();

  consultantRouter.get('/:id', wrapRequestHandler(consultantController.getById.bind(consultantController)));

  consultantRouter.post('/', wrapRequestHandler(consultantController.postCreate.bind(consultantController)));

  consultantRouter.get('/', wrapRequestHandler(consultantController.getAll.bind(consultantController)));

  consultantRouter.put('/:id', wrapRequestHandler(consultantController.putUpdate.bind(consultantController)));

  consultantRouter.delete('/:id', wrapRequestHandler(consultantController.delete.bind(consultantController)));

  export default consultantRouter;
