import axios from 'axios';
import SaveFavoredRecipe from './SaveFavoured';




export default async function  SaveRcipe(recipeId) 
{
  alert('trying to save/like', recipeId)
  try {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    if (!userData) {
      alert("You might need to Login, unless you're just voting..");
      return;
    }

    const userId = userData.user_id;
    const apiRecipeResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    console.log(apiRecipeResponse);
    
    if(apiRecipeResponse.data.meals !== null)
    {
      const apiRecipe = apiRecipeResponse.data.meals[0];
      console.log(apiRecipe);
    }
      
    

    // const favouredRecipe = {
    //   user_id: userId,
    //   recipe_id: recipeId,
    //   recipe: apiRecipe
    // };

    // const favouredRecipesResponse = await axios.get(`http://localhost:8000/favoured-recipes`, {
    //   params: {
    //     user_id: userId
    //   }
    // });
    // const favouredRecipesData = favouredRecipesResponse.data;
    // const existingFavRecipe = favouredRecipesData.find(recipe => recipe.recipe_id === recipeId);

    // const method = existingFavRecipe ? 'DELETE' : 'POST';
    // const url = existingFavRecipe ? `http://localhost:8000/favoured-recipes/${existingFavRecipe.id}`
    //  : `http://localhost:8000/favoured-recipes`;

    // const response = await axios({
    //   method,
    //   url,
    //   data: existingFavRecipe ? null : favouredRecipe
    // });

    // if (response.status === 200) {
    //   console.log(`Favored recipe ${existingFavRecipe ? 'removed' : 'added'} from user ${userId}`);
    //   return !existingFavRecipe;
    // } else {
    //   console.error(`Error ${existingFavRecipe ? 'removing' : 'adding'} favored recipe from user ${userId}`);
    // }

    const fav = await SaveFavoredRecipe(recipeId)
    console.log("fave",fav)

    const recipesResponse = await axios.get(`http://localhost:8000/recipes`);
    const recipes = recipesResponse.data;
    const existingRecipe = recipes.find((r) => r.idMeal === recipeId);

    if (existingRecipe) 
    {
      alert('Recipe already added. Appreciated...');
    } 
    else 
    {
      const response = await axios.post(`http://localhost:8000/recipes`, apiRecipe);
      if (response.status === 201) 
      {
        alert('Recipe added to voted.');
        console.log(`recipe added to voted`);
      } else {
        console.error(`Error adding recipe to voted`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
