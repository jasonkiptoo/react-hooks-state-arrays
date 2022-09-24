import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood, newSpicyFoods } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");

  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else return food.cuisine === filterBy;
  });
  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    const newFoodArray = [...foods, newFood];
    setFoods(newFoodArray);
    // console.log(newFood);
  }
  //handle the clicked food to remove it
  const handleClickedFood = (id, heatLevel) => {
    const newFoodArray = foods.filter((food) => food.id !== id);
    setFoods(newFoodArray);
    // /increment the food heat value by one

    console.log(heatLevel + 1);
  };

  const handleAddFoodHeatLevel = (id) => {
    const newFoodHeat = foods.map((foodHeat) => {
      if (foodHeat.id === id) {
        return {
          ...foodHeat,
          heatLevel: foodHeat.heatLevel + 1,
        };
      } else {
        return foodHeat;
      }
    });
    setFoods(newFoodHeat);
  };
  const foodList = foodsToDisplay.map((food) => (
    <div>
      <li key={food.id}>
        {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
        {"    "}
        <button key={food} onClick={() => handleClickedFood(food.id)}>
          X
        </button>{" "}
        <button key={food.id} onClick={() => handleAddFoodHeatLevel(food.id)}>
          +
        </button>
      </li>
    </div>
  ));
  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }

  return (
    <div>
      <h4>Enter food to filter</h4>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>

      <ol>{foodList}</ol>
      <button onClick={handleAddFood}>Add New Food</button>
    </div>
  );
}

export default SpicyFoodList;
