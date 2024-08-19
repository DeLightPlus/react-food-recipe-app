import { SaveFavoredRecipe } from './SaveMeal';
import './styles.css';
import './SaveMeal.js';
import React, { useEffect, useState } from "react";

const Mealitem = (getMeal) =>
{
    const [showRecipeDetails, setShowRecipeDetails] = useState(false)
    //console.log(getMeal.data)
 
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => 
        {
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
        }, [getMeal.data]);

    
    return(
        <>        

            {
                showRecipeDetails ? (  
                    <div className ="recipe-modal" 
                        style={{
                                backgroundImage:`url(${getMeal.data.strMealThumb})`
                                }}>

                        <div className="btn-container">
                            <button className="rec-close"
                                onClick={() => {  setShowRecipeDetails(false);  }}>                    
                                <div className="icn">&#11178;</div>                    
                            </button>

                            <button className="rec-edit"
                                onClick={() => {
                                    SaveFavoredRecipe(getMeal.data.idMeal); 
                                    console.log(getMeal.data.idMeal);
                                }}>                    
                                <div className="icn">&#128221;</div>                    
                            </button> 

                            <button className="rec-save"
                                onClick={() => {
                                    SaveFavoredRecipe(getMeal.data.idMeal); 
                                    console.log(getMeal.data.idMeal);
                                }}>                    
                                <div className="icn">&#11088;</div>                    
                            </button>   

                        </div>                                    

                        <div className ="info" style={{display:'flex'}}>
                            <div>  
                                <strong>{getMeal.data.strMeal}</strong><br/>
                                <img src={getMeal.data.strMealThumb} alt="meal"/>                  
                                
                                <p>Category: <b>{getMeal.data.strCategory} |  
                                    {getMeal.data.strArea} Food</b></p>
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
                            
                            <div className='instruct-container'>
                            
                                <div className="instructions"> 
                                <hr/>  <u>Instructions:</u>  
                                            
                                <p>                    
                                {
                                        getMeal.data.strInstructions.split('\n').map((line, index) => (
                                        <span key={index}>{line}<br/></span>
                                        ))
                                }
                                </p>
                                                    
                                </div>
                            </div>

                        </div>     
                        
                        {/* <img src={getMeal.data.strMealThumb}/> */}
                        <hr/>
                        <a href={getMeal.data.strYoutube}>Watch video</a>
                        <div className="video-container">
                            
                                    {/* setVurl(item.strYoutube)
                                        //const str=item.strYoutube.split("=");
                                        //state=str[str.length-1];
                                        //state="hj"    */}                      
                            
                                <iframe width="64%" height="515" title="recipeVideo" frameBorder="0" allowFullScreen
                                    src={`https://www.youtube.com/embed/${getMeal.data.strYoutube.split("v=")[1]}`}>
                                </iframe>
                        </div>
                    </div>
                ):(
                    <div className="recipe-card" onClick={() => { setShowRecipeDetails(true); }}>
                        <button className="save"
                            onClick={() => {
                                SaveFavoredRecipe(getMeal.data.idMeal); 
                                console.log(getMeal.data.idMeal);
                            }}>                    
                            <div className="icn">&#9734;</div>
                        </button>

                        <div className ="info">
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
export default Mealitem;