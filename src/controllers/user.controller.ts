import 'reflect-metadata'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../models/Entity/User.entity'


export class UserController {
  async getAll(req: Request, res: Response) {
    const userRepository = getRepository(User)
    const users = await userRepository.find()
    res.json(users)
  }

  async create(req: Request, res: Response) {
<<<<<<< HEAD
    const userRepository = getRepository(User)
    console.log(req)
    const { name, email } = req.body
    const userTmp = userRepository.create({ name, email })
    await userRepository.save(userTmp)
    res.status(201).json(userTmp)
  }
}
=======
    const userRepository = getRepository(User);
    const { name, email } = req.body;
    const userTmp = userRepository.create({ name, email });
    await userRepository.save(userTmp);
    res.status(201).json(userTmp);
  }

  async delete(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const users = await userRepository.deleteAll();
    res.json(users);
  }
}
>>>>>>> 197c516d07f1545dd08f3a25d6273dbc9918acf0
