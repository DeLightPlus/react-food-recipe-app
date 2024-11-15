import React, { useState, useEffect } from 'react';
import showcase_img from "../assets/food-display.jpg"


const HomePage = () => 
{
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        // Fetching the frequently searched recipes (let's assume this is from the 'search.php' endpoint)
        const fetchRecipes = async () => {
          try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
            const data = await response.json();
            if (data.meals) {
              setRecipes(data.meals); // Store meals in state
            }
          } catch (error) {
            console.error("Error fetching recipes:", error);
          }
        };
    
        fetchRecipes();
      }, []);

    return ( 
        <div className="showcase">
          <img src={showcase_img} />
          <div className="h-scroll">
            {recipes.length > 0 ? (
                recipes.map((recipe) => (
                <div key={recipe.idMeal} className="recipe-card">
                    <h2>{recipe.strMeal}</h2>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                  
                    <a href={`https://www.themealdb.com/meal.php?c=${recipe.idMeal}`} target="_blank" rel="noopener noreferrer">
                    <button>See full recipe</button>
                    </a>
                </div>
                ))
            ) : (
                <p>Loading recipes...</p>
            )}
            </div>
        </div>
     );
}
 
export default HomePage;