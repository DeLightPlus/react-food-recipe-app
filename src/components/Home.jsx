import "../app.css"
import React, { useState, useEffect } from 'react';
import showcase_img from "../assets/food-display.jpg"
import { Link } from "react-router-dom";
import MyRecipe from "./recipes/MyRecipe";
import Recipe from "./recipes/Recipes";
import Recipes from "./recipes/Recipes";
import RecipesComponent from "./recipes/Recipes";
import AddRecipe from "./recipes/AddRecipe";


const HomePage = ({ 
    recipeList, loggedInUser, 
    showAddRecipeModal, setShowAddRecipeModal }) => 
{
    // const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        // Fetching the frequently searched recipes (let's assume this is from the 'search.php' endpoint)
          
        // fetchRecipes();
      }, []);

    return ( 

        <div className="flex-container">
            <aside className="sidebar">
                <div className="card"> categories                
                    <select onChange={(e) => { console.log('Category:', e.target.value); } } >
                        <option value=""> All </option>
                        <option value="Miscellaneous">Miscellaneous</option>
                        <option value="Seafood">Seafood</option>
                        <option value="">Desset</option>
                        <option value="">Side</option>
                        <option value="">Beef</option>
                    </select>                   
                </div>
                {
                    loggedInUser &&
                    <>
                        <div className="card">🔃
                            <select onChange={(e) => { console.log('Filter:', e.target.value); } } >
                                <option value=""> A-Z </option>
                                <option value="favoured">My Favoured</option>
                                <option value="Seafood">Recent</option>
                                <option value="">Popular</option>                                
                            </select> 
                        </div> 
                        <div className="card"
                            onClick={()=>{ setShowAddRecipeModal(true) }}
                        >Add a New Recipe</div>
                         
                    </>
                }                
            </aside>

            <div className="main-container">    
                <div className="showcase" id="#">
                    
                        <img src={showcase_img} />
                        
                        <div className="h-scroll">
                        {
                            recipeList.length > 0 ? (
                                recipeList.map((recipe) => (
                                <div key={recipe.idMeal} className="recipe-card">
                                    <h2>{recipe.strMeal}</h2>
                                    <img src={recipe.strMealThumb} alt={recipe.strMeal} />                                
                                    <Link to={`${recipe.strSource}`} > 
                                        See full recipe
                                    </Link>
                                </div>
                                ))
                            ) : (
                                <p>Loading recipes...</p>
                            )}
                        </div>
                </div>             

                <h3>Recipe Book ({recipeList.length})</h3>
                <div className="card-grid" id="Recipes"> 
                    <RecipesComponent recipeList={recipeList} 
                        showAddRecipeModal={showAddRecipeModal} 
                        setShowAddRecipeModal={setShowAddRecipeModal} 
                    />            
                </div>

            </div>

            {
                showAddRecipeModal && (
                <AddRecipe 
                    showAddRecipeModal={showAddRecipeModal}
                    setShowAddRecipeModal={setShowAddRecipeModal}
                />
            )}              
        </div>
     );
}
 
export default HomePage;