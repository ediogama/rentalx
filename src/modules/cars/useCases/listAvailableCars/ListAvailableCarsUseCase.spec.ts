import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all avaiable cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car description",
      daily_rate: 130.0,
      license_plate: "AFG-4231",
      fine_amount: 110.0,
      brand: "Car_brand",
      category_id: "category_Id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all avaiable cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car description",
      daily_rate: 130.0,
      license_plate: "ATG-4345",
      fine_amount: 110.0,
      brand: "Car_brand_test",
      category_id: "category_Id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all avaiable cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Car description",
      daily_rate: 130.0,
      license_plate: "AFG-4231",
      fine_amount: 110.0,
      brand: "Car_brand_test",
      category_id: "category_Id",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "Car 3" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all avaiable cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Car description",
      daily_rate: 130.0,
      license_plate: "AFY-4211",
      fine_amount: 110.0,
      brand: "Car_brand_test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id",
    });

    expect(cars).toEqual([car]);
  });
});
