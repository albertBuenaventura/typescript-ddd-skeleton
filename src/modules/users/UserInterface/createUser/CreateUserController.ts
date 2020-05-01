import ICreateUserService from '../../contracts/ICreateUserService';
import { CreateUserDto } from './CreateUserDto';

import * as express from 'express';

export class CreateUserController {
  private readonly service: ICreateUserService;

  constructor(service: ICreateUserService) {
    //TODO: inject abstraction
    this.service = service;
  }

  async execute(
    req: express.Request,
    res: express.Response,
  ): Promise<express.Response> {
    const { username, email, password } = req.body;

    const dto: CreateUserDto = { username, email, password };

    try {
      const user = await this.service.execute(dto);

      return res.json({ result: 'success' }); //TODO: Create Error middleware
    } catch (e) {
      return res.json({ result: 'error' }); //TODO: Create Error middleware
    }
  }
}
