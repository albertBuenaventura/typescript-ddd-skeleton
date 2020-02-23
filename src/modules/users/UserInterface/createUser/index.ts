
import { CreateUserService } from "./CreateUserService";
import { CreateUserController } from "./CreateUserController";
import { UserRepository } from "./../../Infrastructure/Repository/UserRepository";
import { SingletonMongoHelper } from "../../../../shared/Infrastructure/database/SingletonMongoHelper"

const mongoInstance = SingletonMongoHelper.getInstance();
const dbConnection = mongoInstance.getDatabaseConnection()

const userRepository = new UserRepository(dbConnection)
const createUserService = new CreateUserService(userRepository);
const createUserController = new CreateUserController(
    createUserService
)

export {
  createUserService,
  createUserController
}