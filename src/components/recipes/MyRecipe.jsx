import React from "react";
import MealItem from "./MealItem.jsx";
import '../styles.css';
import AddRecipe from "./AddRecipe.jsx";

const MyRecipe = ({ 
  showMyFavoured,
  myRecipeList, setMyRecipeList,
  myFavouredRecipes, setMyFavouredRecipes,
  showAddRecipeModal, setShowAddRecipeModal
  }) => {


  console.log('_myRecipes:', myRecipeList);
  console.log("myFave:", myFavouredRecipes)

  return (
    <div className="recipe-container">
      {
        showAddRecipeModal &&
        <AddRecipe 
          showAddRecipeModal={showAddRecipeModal}
          setShowAddRecipeModal={setShowAddRecipeModal}
        />
      }   

      <div className="fav-recipes">
      { showMyFavoured && <h2> Favoured Recipes </h2> }
        <ul className="fav-list" id="my_fav_recipes">     
        
        { 
          myFavouredRecipes === 0 ?
            (<>No Recipes in your Favoured Recipes</>): 
            (          
                showMyFavoured &&
                <>
                
                {myFavouredRecipes.map((recipe) =>    
                  (
                    <li key={recipe.id}>
                      <MealItem data={recipe.recipe} isFav={true}/>
                    </li> 
                  ))
                } 
               
                </>          
            )
        } 
        </ul>
      </div>

      <div className="my_recipes">   
        <h2> My Recipes ({myRecipeList.length}) </h2>
        {                
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
                          editable={recipe.strCreativeCommonsConfirmed}
                        />
                        {/* {console.log('rec ', recipe,'X myFavRec ', myFavouredRecipes.some(favouredRecipe => favouredRecipe.recipe_id === recipe.idMeal))} */}
                      </li> ))  
                    )
            }         
            </ul> 
          
        }
      </div>  

      <aside>
        
      </aside>
    </div>
  );
};

export default MyRecipe;