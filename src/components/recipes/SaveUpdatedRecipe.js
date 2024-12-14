import axios from 'axios';

const SaveUpdatedRecipe = async (idMeal, updatedRecipe, ingredients) => 
{
  try {
    // Retrieve user from session storage
    let user = sessionStorage.getItem('user');
    console.log(user);
    
<<<<<<< HEAD
    if (user && user !== null) {
      const user_id = JSON.parse(user).user_id;
      console.log(user_id);  // Corrected from `loggedInUser` to `user_id`

      if (user_id !== null || user_id !== undefined) 
      {
        // Prepare the ingredients in the expected format
        const formattedIngredients = ingredients.map((ingred, index) => ({
          [`strIngredient${index + 1}`]: ingred.ingredient,
          [`strMeasure${index + 1}`]: ingred.measure,
        }));

        // Make the PUT request to update the recipe
        const response = await axios.put(
          `https://localhost:8000/favoured-recipes?user_id=${user_id}&recipe_id=${idMeal}`, 
=======
    if(user !== '' || user !== null)
    {
      const user_id = JSON.parse(user).user_id;
      console.log(user_id);
      
      if(user_id !== null)
      {
        const response = await axios.put(`https://localhost:8000/favoured-recipes?user_id=${user_id}&recipe_id=${idMeal}`, 
>>>>>>> 3cda761f12250f4568019f4e52bea191ddf3f7c3
          {
            strMeal: updatedRecipe.strMeal,
            strCategory: updatedRecipe.strCategory,
            strArea: updatedRecipe.strArea,
            strInstructions: updatedRecipe.strInstructions,
            ingredients: formattedIngredients,  // Ensure ingredients are properly structured
          }
        );
        
        if (response.status === 200) {
          return true;  // Recipe updated successfully
        } else {
          return false;  // Response was not successful
        }
      } else {
        console.log('No user logged in');
        return false;  // No user logged in
      }
    }
  } catch (error) {
    console.error(error);
    return false;  // Error occurred
  }
};

export default SaveUpdatedRecipe;

 
