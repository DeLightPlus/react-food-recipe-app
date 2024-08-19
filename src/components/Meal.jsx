import React from "react";
import Mealitem from "./MealItem.jsx";
import './styles.css';

const Meal = ({ recipeList = [], showMyRecipeList, myRecipeList = [], setMyRecipeList }) => {
  return (
    <>
      <ul className="main">        
        {
            recipeList.length === 0 ? 
            (
              <p className="notSearch">Not found</p>
              
            ) : (
                recipeList.map((recipe) => {
                  <li key={recipe.idMeal}>
                    <Mealitem data={recipe} />
                  </li> })  
              )
        }        
      </ul>
    </>
  );
};

export default Meal;