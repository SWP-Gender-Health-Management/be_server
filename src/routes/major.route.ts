// import { Router } from 'express'
// import majorController from '~/controllers/major.controller'
// import wrapRequestHandler from '~/utils/handle'


// const router = Router()

// /*
//   Description: fet information of the consultant
//   Path: /consultant
//   Method: GET
//   Body: {
//     con_id: String
//   }
// */
// router.get('/get', wrapRequestHandler(majorController.getById.bind(majorController)));

// /*
//   Description: fet information of the consultant
//   Path: /consultant
//   Method: GET
//   Body: {
//     con_id: String
//   }
// */
// router.post('/create', wrapRequestHandler(majorController.postCreate.bind(majorController)));

// /*
//   Description: get all consultant
//   Path: /consultant
//   Method: post
//   Body: {
//   }
// */
// router.get('/getAll', wrapRequestHandler(majorController.getAll.bind(majorController)));

// /*
//   Description: update 
//   Path: /consultant
//   Method: put
//   Body: {
//     info...
//   }
// */
// router.put('/update', wrapRequestHandler(majorController.putUpdate.bind(majorController)));

// export default router

import { Router } from 'express';
import { MajorController } from '~/controllers/major.controller';
import wrapRequestHandler from '~/utils/handle';

export function createMajorRouter(): Router {
  const router = Router();
  const majorController = new MajorController();

  /*
    Description: Get information of the major
    Path: /majors/:id
    Method: GET
  */
  router.get('/:id', wrapRequestHandler(majorController.getById.bind(majorController)));

  /*
    Description: Create a new major
    Path: /majors
    Method: POST
    Body: { name: String }
  */
  router.post('/', wrapRequestHandler(majorController.postCreate.bind(majorController)));

  /*
    Description: Get all majors
    Path: /majors
    Method: GET
  */
  router.get('/', wrapRequestHandler(majorController.getAll.bind(majorController)));

  /*
    Description: Update a major
    Path: /majors/:id
    Method: PUT
    Body: { name?: String }
  */
  router.put('/:id', wrapRequestHandler(majorController.putUpdate.bind(majorController)));

  /*
    Description: Delete a major
    Path: /majors/:id
    Method: DELETE
  */
  router.delete('/:id', wrapRequestHandler(majorController.delete.bind(majorController)));

  return router;
}