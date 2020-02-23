import { CreateUserDto } from './../UserInterface/createUser/CreateUserDto'

export default interface ICreateUserService {
    execute(createUserDto:CreateUserDto): Promise<CreateUserDto>;
}