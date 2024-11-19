import axios from 'axios';

export default async function SaveRecipe(recipeId) {
  try 
  {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    if (!userData) 
    {
      alert("You might need to Login, unless you're just voting..");
      return;
    }

    const recipesResponse = await axios.get(`http://localhost:8000/recipes`);
    const recipes = recipesResponse.data;
    const existingRecipe = recipes.find((r) => r.id === recipeId);

    if (existingRecipe) {
      alert('Recipe already added.');
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