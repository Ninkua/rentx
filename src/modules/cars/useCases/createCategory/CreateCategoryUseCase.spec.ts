import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRespositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRespositoryInMemory;

describe("Create Category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRespositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        )
    })

    it("should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Catgeory description test"
        };
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");
    });

    it ("should not be able to create a new category with name exists", () => {
        expect(async () => {
            const category = {
                name: "Category test",
                description: "Category description test"
            };

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            })
        }).rejects.toBeInstanceOf(AppError);
    });
});