import React, { useEffect, useState } from "react";
import './styles.css';

const Mealitem = (getMeal) =>
{
    //console.log(getMeal.data)

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
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
            <div className="recipe-card">

                <div className ="info">
                    <strong>{getMeal.data.strMeal}</strong><br/>
                    <img src={getMeal.data.strMealThumb} alt="meal"/>                   
                    <p>{getMeal.data.strArea} Food</p>
                    <p>Category: <strong>{getMeal.data.strCategory}</strong></p>
                </div>
                <hr/>

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
                    <a>visit source website: </a>
                </div>

                <div className ="recipe">
                    <h2>Recipe</h2>
                    <div className="instructions"> <u>Instructions:</u>                   
                    <p>                    
                    {
                        getMeal.data.strInstructions.split('\n').map((line, index) => (
                        <span key={index}>{line}<br/></span>
                        ))
                    }
                    </p>
                    <hr/>
                    </div>
                    <img src={getMeal.data.strMealThumb}/>
                    <hr/>
                    <a href={getMeal.data.strSource}>Watch video</a>
                </div>

                <button className="save" >
                    <div className="icn">&#9734;</div>
                </button>
            </div>  
        </>
    )
}
export default Mealitem;