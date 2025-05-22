import { Router } from 'express'
import majorController from '~/controllers/major.controller'
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
conRoute.get('/get', wrapRequestHandler(majorController.getById));

/*
  Description: fet information of the consultant
  Path: /consultant
  Method: GET
  Body: {
    con_id: String
  }
*/
conRoute.post('/create', wrapRequestHandler(majorController.postCreate));

/*
  Description: get all consultant
  Path: /consultant
  Method: post
  Body: {
  }
*/
conRoute.get('/getAll', wrapRequestHandler(majorController.getAll));

/*
  Description: update 
  Path: /consultant
  Method: put
  Body: {
    info...
  }
*/
conRoute.put('/update', wrapRequestHandler(majorController.putUpdate));

export default conRoute
