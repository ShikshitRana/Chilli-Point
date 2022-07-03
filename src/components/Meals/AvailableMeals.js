import { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meal, setMeal] = useState([]);
  const [load, setload] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    setload(true);
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-order-app-4c217-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeal(loadedMeals);
      setload(false);
    };

    fetchMeals().catch((err) => {
      setHttpError(err.message);
      setload(false);
    });
  }, []);

  const errr = <p className={classes.httperror}>{httpError}</p>;

  const meals = meal.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        info={meal.description}
        price={meal.price}
      />
    );
  }); 

  return (
    <div className={classes.meals}>
      {load && <p className={classes.loading}>Loading Available Meals...</p>}
      {httpError && errr}
      {meals}
    </div>
  );
};

export default AvailableMeals;
