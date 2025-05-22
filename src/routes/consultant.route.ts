import { Router } from 'express'
import consultantController from '~/controllers/consultant.controller'
import wrapRequestHandler from '~/utils/handle'

const conRoute = Router()

/*
  Description: fet information of the consultant
  Path: /consultant
  Method: GET
  Body: {
    con_id: String
  }
*/
conRoute.get('/consultant', wrapRequestHandler(consultantController.getById));

/*
  Description: update 
  Path: /consultant
  Method: GET
  Body: {
    info...
  }
*/
conRoute.put('/consultant', wrapRequestHandler(consultantController.putUpdate));

export default conRoute
