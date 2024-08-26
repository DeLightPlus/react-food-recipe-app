import axios from 'axios';
import { recipe } from './recipe';

export default async function SaveFavoredRecipe(recipeId) {
  try {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    if (!userData) {
      alert("You might need to Login, unless you're just voting..");
      return;
    }

    const userId = userData.user_id;
    const apiRecipeResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const apiRecipe = apiRecipeResponse.data.meals[0];

    const favouredRecipe = {
      user_id: userId,
      recipe_id: recipeId,
      recipe: apiRecipe
    };

    const favouredRecipesResponse = await axios.get(`http://localhost:8000/favoured-recipes`, {
      params: {
        user_id: userId
      }
    });
    const favouredRecipesData = favouredRecipesResponse.data;
    const existingFavRecipe = favouredRecipesData.find(recipe => recipe.recipe_id === recipeId);

    const method = existingFavRecipe ? 'DELETE' : 'POST';
    const url = existingFavRecipe ? `http://localhost:8000/favoured-recipes/${existingFavRecipe.id}`
     : `http://localhost:8000/favoured-recipes`;

    const response = await axios({
      method,
      url,
      data: existingFavRecipe ? null : favouredRecipe
    });

    // console.log(response);    

    if (response.status === 200 || response.status === 201 ) 
    {
      console.log(`Favored recipe ${existingFavRecipe ? 'removed' : 'added'} for user ${userId}`);
      // return !existingFavRecipe;
    } 
    else {  console.log(`Error ${existingFavRecipe ? 'removing' : 'adding'} favored recipe for user ${userId}`);  }

    const recipesResponse = await axios.get(`http://localhost:8000/recipes`);
    const recipes = recipesResponse.data;
    const existingRecipe = recipes.find((r) => r.idMeal === recipeId);
    console.log(existingRecipe, recipes);
    

    if (existingRecipe) 
    {
      alert('Appreciated...');
    } 
    else 
    {
      const response = await axios.post(`http://localhost:8000/recipes`, apiRecipe);
      if (response.status === 201) {
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

