import React from "react";
import MealItem from "./MealItem.jsx";
import './styles.css';

const Meal = ({ showMyRecipeList, recipeList = [], myRecipeList = [], setMyRecipeList }) =>
{
  console.log('_Recipes:', recipeList);
  console.log('_myRecipes:', myRecipeList);

  return (
    <>
    {/* {
      showMyRecipeList &&
        <ul className="main" id="my_recipes">        
        {
            myRecipeList.length === 0 ? 
            (
              <p className="notSearch">You haven't added any recipe, would you like to add your own recipes ? <a> Click Here</a> </p>              
            ) : (
                  myRecipeList.map((recipe) => (
                    <li key={recipe.id}>
                      <MealItem data={recipe} />
                    </li> ))  
                )                
        }        
        </ul>
    }<hr></hr> */}

      
      <ul className="main" id="themealdb_recipes">        
        {
            recipeList.length === 0 ? 
            (
              <p className="notSearch"> Not found, would you like to add your own recipes ? <a> Click Here</a> </p>              
            ) : (
                  recipeList.map((recipe) => (
                    <li key={recipe.idMeal}>
                      <MealItem data={recipe} />
                      <button className="showIng_btn"
                        onClick={() => setShowIngredients(!showIngredients)}>
                          Show Ingredients
                      </button>
                    </li> ))  
                )                
        }        
      </ul>
    </>
  );
};

export default Meal;