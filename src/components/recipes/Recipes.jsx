import '../styles.css';
import AddRecipe from "./AddRecipe.jsx";
import MealItem from './MealItem.jsx';

const RecipesComponent = ({ 
  recipeList = [],
  showAddRecipeModal, 
  setShowAddRecipeModal
}) => {

  console.log('_Recipes:', recipeList);

  return (
    <>            

      {/* My Recipe Book */}      
      <> 
        {recipeList.length === 0 ? (
          <p className="notSearch">
            You haven't added any recipe. Would you like to add your own recipes?
            <a onClick={() => setShowAddRecipeModal(true)}> Click Here</a>
          </p>
        ) : (
          recipeList.map((recipe) => (
            <div key={recipe.id} className='card'>
              <MealItem 
                data={recipe} 
                isFav={false}
                canEdit={false}
                // isFav={myFavouredRecipes.some(favouredRecipe => favouredRecipe.recipe_id === recipe.idMeal)}
              />
            </div>
          ))
        )}
      </>

      {/* Favoured Recipes */}
      {/* <h2>Favoured Recipes ({myFavouredRecipes.length})</h2>
      <ul className="main" id="my_fav_recipes">     
        {myFavouredRecipes.length === 0 ? (
          <p>No Recipes in your Favoured Recipes</p>
        ) : (
          myFavouredRecipes.map((favouredRecipe) => (
            <li key={favouredRecipe.recipe.id}>
              <MealItem data={favouredRecipe.recipe} isFav={true} />
            </li>
          ))
        )}
      </ul> */}   
    </>
  );
};

export default RecipesComponent;
