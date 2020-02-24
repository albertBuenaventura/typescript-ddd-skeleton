
import { CreateUserService } from "./CreateUserService";
import { CreateUserController } from "./CreateUserController";
import { UserRepository } from "./../../Infrastructure/Repository/UserRepository";
import { Db } from "mongodb";

export default class UserUseCase {
  private readonly db:Db
  private createUserController:CreateUserController

  constructor(db:Db) {
    this.db = db;
    this.initUseCase()
  }

  initUseCase(): void {
    const userRepository = new UserRepository(this.db)
    const createUserService = new CreateUserService(userRepository);
    this.createUserController = new CreateUserController(
      createUserService
    )
  }

  getController(): CreateUserController {
    return this.createUserController
  }
}