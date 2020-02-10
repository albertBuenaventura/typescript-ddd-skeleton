import { CreateUserDto } from './CreateUserDto'

export class CreateUserService {
    
    constructor() {} //Inject Repository Here

    async execute(createUserDto:CreateUserDto) : Promise<CreateUserDto> {
        return createUserDto 
    }
}