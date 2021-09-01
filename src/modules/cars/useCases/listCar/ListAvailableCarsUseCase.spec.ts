import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"


let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", ()=>{

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available  cars", async () => {
       const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DEF-123",
            fine_amount: 40,
            brand: "Car_brand",
            category_id: "category"
       })
        
        const cars = await listAvailableCarsUseCase.execute({});
        
        expect(cars).toEqual([car]);
    })

    it("should be able to list all available  cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Car_brand_test",
            category_id: "category"
        })
        
        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand_test",
        });
        expect(cars).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                brand: "Car_brand_test",
              }),
            ])
          );
    
    })

    it("should be able to list all available  cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Description Car",
            daily_rate: 110.0,
            license_plate: "DEF-12345",
            fine_amount: 60,
            brand: "Car_brand_teste",
            category_id: "category"
        })
        
        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3",
        });
        expect(cars).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                name: "Car3",
              }),
            ])
          );
    })

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car4",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-123456",
            fine_amount: 60,
            brand: "Car_brand_teste",
            category_id: "12345"
        })
        
        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345",
        });
        expect(cars).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                category_id: "12345",
              }),
            ])
          );
    })
});