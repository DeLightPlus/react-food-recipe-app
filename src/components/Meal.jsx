import React from "react";
import MealItem from "./MealItem.jsx";
import './styles.css';

const Meal = ({ myRecipeList, setMyRecipeList, myFavouredRecipes=[] }) =>
{ 
  console.log('_myRecipes:', myRecipeList);

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
      }  
   

      <aside>
        <button onClick={() => setMyRecipeList([...myRecipeList, recipeList[0]])}>Navbar</button>
      </aside>
    </>
  );
};

export default Meal;