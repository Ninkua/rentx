import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest{
    name:string;
    description: string;

}

@injectable()
class CreateSpecificationUseCase{

    constructor(
        @inject("SpecificationsRepository") 
        private specificationsRepository: ISpecificationsRepository){}

   async execute({name, description}: IRequest) : Promise<void>{

        const SpecificationAlreadyExists = await this.specificationsRepository.findByName(name);

        if (SpecificationAlreadyExists){
            throw new Error("Specification Aleardy Exists!")
        }

       await this.specificationsRepository.create({
            name,
            description
        })
    }
}

export {CreateSpecificationUseCase};