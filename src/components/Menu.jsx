import MealCard from "./MealCard";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

export default function Menu() {
  const {
    data: mealItems,
    error,
    isLoading,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Loading available meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {mealItems.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
