
import '../styles.css';
import '../../utils/SaveFavoured.js';


import { useEffect, useState } from "react";
import RecipeModal from './RecipeModal.jsx';
import SaveFavoredRecipe from '../../utils/SaveFavoured.js';
import SaveRecipe from '../../utils/SaveRecipe.js';

import EditRecipeModal from './EditRecipeModal.jsx';

const MealItem = ({data, isFav, canEdit}) =>
{  
    let user = JSON.parse(sessionStorage.getItem('user'))
    let userId = null;
    if(user) 
    {
        userId = user.user_id;        
    }
    
    const [showRecipeDetails, setShowRecipeDetails] = useState(false);
    const [showEditRecipeModal, setShowEditRecipeModal] = useState(false);
    
    
    const [showIngredients, setShowIngredients] = useState(false);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => 
        {
            const checkFav = async () =>
            {              
                console.log('uid', userId, isFav);
            }
            checkFav();            

            const ingredientsSet = new Set();
            for (let i = 1; i <= 20; i++) 
            {
                const ingredient = data[`strIngredient${i}`];
                if (ingredient && !ingredientsSet.has(ingredient)) 
                {
                    ingredientsSet.add({"ingredient": ingredient, "measure": data[`strMeasure${i}`]});
                }
            }
            const ingredientsArray = Array.from(ingredientsSet);
            setIngredients(ingredientsArray);
        }, [data.idMeal, userId]);
        

    return(
        <>      
            {
                showRecipeDetails ?
                (  
                    <RecipeModal
                        data={data}
                        ingredients={ingredients}
                        showRecipeDetails={showRecipeDetails}
                        setShowRecipeDetails={setShowRecipeDetails}
                    />
                ):(
                    <div className="recipe-card" > 
                        {
                            (isFav) ? (
                            <button className="edit"
                                onClick={() => { setShowEditRecipeModal(true)  }}>                    
                                <div className="icn">📝</div>{/* &#128221; ✏️ */}
                            </button> ):(
                                <></>
                            )
                        }                       

                        <div className ="info" >
                            <strong style={{textAlign:'start', padding:'4px 8px'}}>{data.strMeal} </strong>
                            
                            <small style={{textAlign:'start', padding:'4px 8px'}}>{data.strCategory} </small>
                            <img src={data.strMealThumb} alt="🍱"/>     
                        </div>  

                        <div className="h-group">
                            {
                                (!showIngredients )&& 
                                <button className='link-item'
                                    onClick={() => { setShowIngredients(!showRecipeDetails); }}>
                                        Ingredients
                                </button>
                            }
                            {/* <button className='link-item'
                                onClick={() => { 
                                    setShowIngredients(false);
                                    setShowRecipeDetails(true); 
                                    }}>
                                See full recipe
                            </button> */}
                        </div> 
                        
                        {
                            showIngredients && (
                            <div className="ingredients">
                                <button onClick={() => setShowIngredients(!showIngredients) }> {`↩`}</button>
                                <div className="ingred-info">  
                                    <>
                                        {
                                            ingredients.map((ingred, index) => (
                                                <div className="grid-item" key={index}>›
                                                    { ingred.ingredient } 
                                                    <small>({ingred.measure})</small>
                                                </div>
                                            ))
                                        }
                                    </>
                                </div>
                                <p>Source: <a href={data.strSource}> Link </a></p>
                            </div> )
                        }                        

                        {                          
                            
                            <button className="like"
                                onClick={() => { SaveRecipe(data.idMeal) }}>                    
                                <div className="icn">{ !isFav ? <>⭐</> : <>🌟</>}</div> 
                                    {/*💕👌❤️👍✨♥️*/}
                            </button>                            
                        }
                    </div>  
                )
            }
            
            {
                showEditRecipeModal && (
                    
                    <EditRecipeModal data={data} 
                        showEditRecipeModal={showEditRecipeModal} 
                        setShowEditRecipeModal={setShowEditRecipeModal}
                    />
                   
                )
            }

        </>
    )
}
export default MealItem;