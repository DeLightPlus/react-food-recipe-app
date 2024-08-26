import React from "react";
import MealItem from "./MealItem.jsx";
import './styles.css';
import AddRecipe from "./AddRecipe.jsx";

const MyRecipe = ({ 
   showMyRecipeList, showMyFavoured,
   recipeList = [], 
   myRecipeList = [], setMyRecipeList,
   myFavouredRecipes = [], setMyFavouredRecipes,
   showAddRecipeModal, setShowAddRecipeModal
   }) => {
  console.log('_Recipes:', recipeList);
  console.log('_myRecipes:', myRecipeList);
  return (
    <>
    {
      showAddRecipeModal &&
      <AddRecipe 
        showAddRecipeModal={showAddRecipeModal}
        setShowAddRecipeModal={setShowAddRecipeModal}/>
    }
    { showMyFavoured && <h2> Favoured Recipes () </h2> }
    <ul className="main" id="my_fav_recipes">     
    
    { 
      myFavouredRecipes === 0 ?
        (<>No Recipes in your Favoured Recipes</>): 
        (          
            showMyFavoured &&
            <>
            {myFavouredRecipes.map((recipe) =>    
              (
                <li key={recipe.recipe.id}>
                          <MealItem data={recipe.recipe} isFav={true}/>
                      </li> 
                    ))}
            </>          
        )
    } 
    </ul> 

    <hr></hr>
    <h2> My Recipes ({myRecipeList.length}) </h2>
    {   
        showMyRecipeList &&  
        <ul className="main" id="my_recipes"> 
        {     
        
            myRecipeList.length === 0 ? 
            (
              <p className="notSearch">You haven't added any recipe, would you like to add your own recipes ? <a> Click Here</a> </p>              
            ) : (
                myRecipeList.map((recipe) => (
                  <li key={recipe.id}>
                    <MealItem data={recipe} 
                      isFav={ myFavouredRecipes.some(favouredRecipe => favouredRecipe.recipe_id === recipe.idMeal) }
                    />
                    {console.log('rec ', recipe,'X myFavRec ', myFavouredRecipes.some(favouredRecipe => favouredRecipe.recipe_id === recipe.idMeal))}
                  </li> ))  
                )
        }         
        </ul> 
       
    }
    </>
  );
};

export default MyRecipe;