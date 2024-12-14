import React from "react";
import MealItem from "./MealItem.jsx";
import Dropdown from "../Dropdown.jsx"

import '../styles.css';

<<<<<<< HEAD
<<<<<<< HEAD:src/components/Meal.jsx
const Meal = ({ myRecipeList, setMyRecipeList, myFavouredRecipes=[] }) =>
{ 
  console.log('_myRecipes:', myRecipeList);
=======
const Meal = ({ showMyRecipeList, recipeList = [], myRecipeList = [], setMyRecipeList, myFavouredRecipes=[] }) =>
=======
const Meal = ({ myRecipeList, setMyRecipeList, myFavouredRecipes=[] }) =>
>>>>>>> 3cda761f12250f4568019f4e52bea191ddf3f7c3
{
  // console.log('_Recipes:', recipeList);
  // console.log('_myRecipes:', myRecipeList);
>>>>>>> c8c54b8b8e127dbbd0dd8bda0453cffbe3cd317e:src/components/recipes/Meal.jsx

  return (
    <>
      {
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
<<<<<<< HEAD:src/components/Meal.jsx
      }  
   
=======
    }<hr></hr> */}

      
      <ul className="main" id="themealdb_recipes">        
      {
          recipeList.length !== 0 &&             
          recipeList.map((recipe) => (
            <li key={recipe.idMeal}>
                <MealItem data={recipe} 
                  isFav={ myFavouredRecipes.some(favouredRecipe => favouredRecipe.recipe_id === recipe.idMeal) }
                />                
            </li> 
          ))                               
      }        
      </ul>
>>>>>>> c8c54b8b8e127dbbd0dd8bda0453cffbe3cd317e:src/components/recipes/Meal.jsx

      <aside>
        <Dropdown />
        <button onClick={() => setMyRecipeList([...myRecipeList, recipeList[0]])}>Navbar</button>
      </aside>
    </>
  );
};

export default Meal;