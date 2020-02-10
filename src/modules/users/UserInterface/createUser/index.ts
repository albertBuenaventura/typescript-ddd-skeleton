
import { CreateUserService } from "./CreateUserService";
import { CreateUserController } from "./CreateUserController";

const createUserService = new CreateUserService();
const createUserController = new CreateUserController(
    createUserService
)

export {
  createUserService,
  createUserController
}