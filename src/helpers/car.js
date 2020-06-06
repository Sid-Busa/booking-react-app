import Sedan from "../assets/sedan.svg";
import Van from "../assets/van.svg";
import MiniVan from "../assets/minivan.svg";

const cars = [
  {
    name: "Van",
    min: 7,
    max: 8,
    icon: Van,
  },
  {
    name: "Minivan",
    min: 4,
    max: 6,
    icon: MiniVan,
  },
  {
    name: "Sedan",
    min: 1,
    max: 3,
    icon: Sedan,
  },
];

export const getCarsFromPassengerNumber = (passengerNumber) => {
  let totalCars = [];
  if (passengerNumber <= 0) {
    return "Please select passenger number";
  } else if (passengerNumber < 9) {
    totalCars = [
      {
        count: 1,
        icon: cars.find((car) => {
          return passengerNumber >= car.min && passengerNumber <= car.max;
        }).icon,
        name: cars.find((car) => {
          return passengerNumber >= car.min && passengerNumber <= car.max;
        }).name,
      },
    ];
  } else {
    let totalPassengerLeft = passengerNumber;
    while (totalPassengerLeft > 0) {
      for (let currentCar of cars) {
        const howManyCars = Math.floor(totalPassengerLeft / currentCar.max);
        if (howManyCars > 0) {
          totalCars.push({ count: howManyCars, icon: currentCar.icon, name: currentCar.name });
        } else if (howManyCars === 0 && totalPassengerLeft >= 1 && totalPassengerLeft <= 3) {
          totalCars.push({ count: howManyCars + 1, icon: cars[2].icon, name: cars[2].name });
        } else if (howManyCars === 0 && totalPassengerLeft >= currentCar.min && totalPassengerLeft <= currentCar.max) {
          totalCars.push({ count: howManyCars + 1, icon: currentCar.icon, name: currentCar.name });
        }
        totalPassengerLeft = totalPassengerLeft < 9 ? 0 : totalPassengerLeft % currentCar.max;
      }
      totalPassengerLeft = 0;
    }
  }
  return totalCars;
};
