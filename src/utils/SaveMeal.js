<<<<<<< HEAD
=======
import axios from 'axios';

export default async function SaveFavoredRecipe(recipeId) {
  try {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    if (!userData) {
      alert("You might need to Login, unless you're just voting..");
      return;
    }

    const userId = userData.user_id;
    
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

    if (response.status === 200) {
      console.log(`Favored recipe ${existingFavRecipe ? 'removed' : 'added'} from user ${userId}`);
      return !existingFavRecipe;
    } else {
      console.error(`Error ${existingFavRecipe ? 'removing' : 'adding'} favored recipe from user ${userId}`);
    }

    const recipesResponse = await axios.get(`http://localhost:8000/recipes`);
    const recipes = recipesResponse.data;
    const existingRecipe = recipes.find((r) => r.id === recipeId);

    if (existingRecipe) {
      alert('Recipe already added.');
    } else {
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
>>>>>>> 3cda761f12250f4568019f4e52bea191ddf3f7c3
