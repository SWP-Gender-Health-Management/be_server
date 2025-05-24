import { Router } from 'express';
import { RoleController } from '~/controllers/role.controller';
import wrapRequestHandler from '~/utils/handle';

export function createRoleRouter(): Router {
  const router = Router();
  const roleController = new RoleController();

  /*
    Description: Get information of the Role
    Path: /Roles/:id
    Method: GET
  */
  router.get('/:id', wrapRequestHandler(roleController.getById.bind(roleController)));

  /*
    Description: Create a new Role
    Path: /Roles
    Method: POST
    Body: { name: String }
  */
  router.post('/', wrapRequestHandler(roleController.postCreate.bind(roleController)));

  /*
    Description: Get all Roles
    Path: /Roles
    Method: GET
  */
  router.get('/', wrapRequestHandler(roleController.getAll.bind(roleController)));

  /*
    Description: Update a Role
    Path: /Roles/:id
    Method: PUT
    Body: { name?: String }
  */
  router.put('/:id', wrapRequestHandler(roleController.putUpdate.bind(roleController)));

  /*
    Description: Delete a Role
    Path: /Roles/:id
    Method: DELETE
  */
  router.delete('/:id', wrapRequestHandler(roleController.delete.bind(roleController)));

  return router;
}