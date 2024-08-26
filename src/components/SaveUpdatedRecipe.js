import axios from 'axios';

const SaveUpdatedRecipe = async (idMeal, updatedRecipe, ingredients) => {
  try 
  {
    const response = await axios.put(`https://localhost:8000/favoured-recipes/${idMeal}`, 
    {
      strMeal: updatedRecipe.strMeal,
      strCategory: updatedRecipe.strCategory,
      strArea: updatedRecipe.strArea,
      strInstructions: updatedRecipe.strInstructions,
      ingredients,
    });

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } 
  catch (error) 
  {
    console.error(error);
    return false;
  }
};

export default SaveUpdatedRecipe;