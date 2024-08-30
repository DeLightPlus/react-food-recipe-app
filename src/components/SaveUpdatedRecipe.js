
import axios from 'axios';


const SaveUpdatedRecipe = async (idMeal, updatedRecipe, ingredients) => {
  try 
  {
    let user = sessionStorage.getItem('user');
    console.log(user);
    
    if(user !== '' || user !== null)
    {
      const user_id = JSON.parse(user).id;
      console.log(loggedInUser);
      
      if(loggedInUser !== null)
      {
        const response = await axios.put(`https://localhost:8000/favoured-recipes?user_id${user_id}&recipe_id=${idMeal}`, 
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
      else console.log('no user loggedIn');
           
    }
  } 
  catch (error) 
  {
    console.error(error);
    return false;
  }
};

export default SaveUpdatedRecipe;

