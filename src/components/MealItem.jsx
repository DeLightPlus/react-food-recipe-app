
import './styles.css';
import './SaveMeal.js';

import axios from 'axios';
import React, { useEffect, useState } from "react";
import RecipeModal from './RecipeModal.jsx';
import SaveFavoredRecipe from './SaveMeal.js';

const MealItem = (getMeal) =>
{
    let user = JSON.parse(sessionStorage.getItem('user'))
    let userId = null;
    if(user) 
    {
        userId = user.user_id;
    }
    
    const [showRecipeDetails, setShowRecipeDetails] = useState(false);
    // const [isFav, setIsFavoured] = useState(false);
    let isFav = false;
    // console.log('_getMeal', getMeal.data) 
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => 
        {
            const checkFav = async () =>
            {              
                console.log('uid',userId);
                
                if (userId) 
                {
                    try 
                    {
                      const response = await axios.get(`http://localhost:8000/favoured-recipes`, 
                        {
                            params: {
                            user_id: userId,
                            recipe_id: getMeal.data.idMeal
                            }
                        });
                  
                      const data = response.data;
                      isFav = data.length > 0;
                  
                    //   console.log(`${getMeal.data.strMeal}`, data);
                    } 
                    catch (error) {  console.error(error);   }
                  }
                
            }
            checkFav();            

            const ingredientsSet = new Set();
            for (let i = 1; i <= 20; i++) 
            {
                const ingredient = getMeal.data[`strIngredient${i}`];
                if (ingredient && !ingredientsSet.has(ingredient)) 
                {
                    ingredientsSet.add({"ingredient":ingredient, "measure":getMeal.data[`strMeasure${i}`]});
                }
            }
            const ingredientsArray = Array.from(ingredientsSet);
            setIngredients(ingredientsArray);
        }, [getMeal.data.idMeal, userId]);

        

    return(
        <>      
            {
                showRecipeDetails ?
                (  
                    <RecipeModal
                        getMeal={getMeal}
                        ingredients={ingredients}
                        showRecipeDetails={showRecipeDetails}
                        setShowRecipeDetails={setShowRecipeDetails}
                    />
                ):(
                    <div className="recipe-card" >
                        <button className="save"
                            onClick={() => { 
                                isFav =  SaveFavoredRecipe(getMeal.data.idMeal) ; 
                                console.log(`Recipe is now ${isFav ? 'favored' : 'not favored'}`);
                            }}>                    
                            <div className="icn">{isFav ? 'd' : 'e'}</div>
                        </button>

                        <div className ="info" onClick={() => { setShowRecipeDetails(true); }}>
                            <strong>{getMeal.data.strMeal}</strong><br/>
                            <img src={getMeal.data.strMealThumb} alt="meal"/>                   
                            
                            <p>Category: <strong>{getMeal.data.strCategory} |  
                                {getMeal.data.strArea} Food</strong></p>
                        </div>               

                        <div className="ingredients">
                            <h4>Ingredients</h4>
                            <div className="ingred-info">                                
                                {/* {console.log('37', ingredients)} */}
                                <>
                                    {
                                        ingredients.map((ingred, index) => (
                                        <div className="grid-item" key={index}>›{ ingred.ingredient } <small>({ingred.measure})</small></div>
                                        ))
                                    }
                                </>
                            </div>
                            <p>visit source website: <a href={getMeal.data.strSource}> Link </a></p>
                        </div> 
                    </div>  
                )

            }

        </>
    )
}
export default MealItem;