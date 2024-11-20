import React, { useState, useEffect } from 'react';
import showcase_img from "../assets/food-display.jpg"


const HomePage = ({myRecipeList}) => 
{
    // const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        // Fetching the frequently searched recipes (let's assume this is from the 'search.php' endpoint)
          
        // fetchRecipes();
      }, []);

    return ( 
        <div className="showcase">
          <img src={showcase_img} />
          <div className="h-scroll">
            {myRecipeList.length > 0 ? (
                myRecipeList.map((recipe) => (
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