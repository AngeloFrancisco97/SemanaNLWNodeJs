import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";



class UsersService {
    private userRepository: Repository<User>

    constructor(){
        this.userRepository = getCustomRepository(UsersRepository);
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({ email });
      
        return user;
      }

    async create(email: string){       
        //Verificar se usuario existe
        const userExists = await this.userRepository.findOne({
            email,
        });

        //Se existir, retorna user        
        if(userExists){
            return userExists;
        }

        const user = this.userRepository.create({
            email,
        });

        await this.userRepository.save(user);
        //Se não existir, salvar no DB
        return user;

    }
}

export { UsersService };