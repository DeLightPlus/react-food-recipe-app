// Create a method to add a favored recipe to a user
export async function SaveFavoredRecipe(recipeId) 
{ 
    // Get the user data from local storage
    const userData = JSON.parse(sessionStorage.getItem('user'));  
    // If user data is not found, throw an error
    if (!userData) 
    {
        alert("You might need to Login, unless you're just voting..")
    //   throw new Error('User data not found');
    }
  
    // Get the user ID from the user data
    
  
    // Fetch the recipe from The Meal DB API
    const api_recipeResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const api_recipeData = await api_recipeResponse.json();
    const api_recipe = api_recipeData.meals[0];
  
    if(userData)
    {
        const userId = userData.user_id;
        // Create a new favored recipe object
        const favouredRecipe = {
            user_id: userId,
            recipe_id: recipeId,
            recipe: api_recipe
        };

        console.log(favouredRecipe);  
        // Send a POST request to the JSON server to add the favored recipe
        const favoured_res = await fetch(`http://localhost:8000/favoured-recipes`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(favouredRecipe)
        });    
        
        // Check if the request was successful
        if (favoured_res.ok) { console.log(`Favored recipe added to user ${userId}`); } 
        else {  console.error(`Error adding favored recipe to user ${userId}`);  }
        
    }   

    const recipesResponse = await fetch(`http://localhost:8000/recipes`);
    const recipes = await recipesResponse.json();
    const existingRecipe = recipes.find((r) => r.id === recipeId);

    if(existingRecipe)
    { 
        alert('Recipe already added, please login if you would like to add it to your favoured.'); 
    } 
    else 
    {
        const response = await fetch(`http://localhost:8000/recipes`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(api_recipe)
        });

        // Check if the request was successful
        if (response.ok) 
        { 
            alert('Recipe already added, please login if you would like to add it to your favoured.'); 
            console.log(`recipe added to voted`); 
        } 
        else {  console.error(`Error adding recipe to voted`);  }
    }

    
    
  }
  
  // Example usage:
  //addFavoredRecipe('52772');