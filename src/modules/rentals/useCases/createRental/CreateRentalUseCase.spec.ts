import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Create a Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "1234",
      user_id: "14568",
      expected_return_date: dayjsDateProvider.dayAdd24Hours(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be possible to register a new rental if there is already an open one for the same user.", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "1234",
        user_id: "14568",
        expected_return_date: dayjsDateProvider.dayAdd24Hours(),
      });

      await createRentalUseCase.execute({
        car_id: "4321",
        user_id: "14568",
        expected_return_date: dayjsDateProvider.dayAdd24Hours(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be possible to register a new rental if there is already an open one for the same car.", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "1234",
        user_id: "14568",
        expected_return_date: dayjsDateProvider.dayAdd24Hours(),
      });

      await createRentalUseCase.execute({
        car_id: "1234",
        user_id: "54878",
        expected_return_date: dayjsDateProvider.dayAdd24Hours(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be possible to register a new rental with invalid return time.", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "1234",
        user_id: "54878",
        expected_return_date: dayjsDateProvider.dateNow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
