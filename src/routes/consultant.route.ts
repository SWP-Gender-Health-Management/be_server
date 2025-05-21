import { Router } from 'express'
import { getConsultantByIdController, putUpdateConsultantController } from '~/controllers/consultant.controller'
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
conRoute.get('/consultant', wrapRequestHandler(getConsultantByIdController));

/*
  Description: update 
  Path: /consultant
  Method: GET
  Body: {
    info...
  }
*/
conRoute.put('/consultant', wrapRequestHandler(putUpdateConsultantController));

export default conRoute
