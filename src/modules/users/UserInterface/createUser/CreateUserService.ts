import { CreateUserDto } from './CreateUserDto';
import IUserRepository from '../../contracts/IUserRepository';
import ICreateUserService from '../../contracts/ICreateUserService';

export class CreateUserService implements ICreateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return createUserDto;
  }
}
