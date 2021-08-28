import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/in-memory/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository{

    private reporitory: Repository<Car>;

    constructor(){
        this.reporitory = getRepository(Car);
    }

   async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name
   }: ICreateCarDTO): Promise<Car>{
       const car = this.reporitory.create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name
        });

        await this.reporitory.save(car);

        return car;
    }

   async findByLicensePlate(license_plate: string): Promise<Car>{
        const car = await this.reporitory.findOne({license_plate})
        
        return car;
    }


}

export {CarsRepository};