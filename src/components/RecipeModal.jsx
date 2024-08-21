import React, { useState, useEffect } from 'react';
import SaveFavoredRecipe from './SaveMeal.js';

const RecipeModal = ({ getMeal, ingredients, showRecipeDetails, setShowRecipeDetails }) => 
{
  const [isFav, setIsFavoured] = useState(false);
  const handleToggleFav = async () => 
    {
      const isNowFav = await SaveFavoredRecipe(getMeal.data.idMeal);
      setIsFavoured(isNowFav);
    }

  return (
    <div className={`recipe-modal`} id={`${showRecipeDetails ? 'active' : ''}`} style={{ backgroundImage: `url(${getMeal.data.strMealThumb})` }}>

      <div className="btn-container">
        <button className="rec-close" onClick={() => setShowRecipeDetails(false)}>
          <div className="icn">&#11178;</div>
        </button>
        <button className="rec-edit" onClick={handleToggleFav}>
          <div className="icn">&#128221;</div>
        </button>
        <button className="rec-save" onClick={handleToggleFav}>
          <div className="icn">&#11088;</div>
        </button>
      </div>

      <div className="info" style={{ display: 'flex' }}>
        <div>
          <strong>{getMeal.data.strMeal}</strong><br />
          <img src={getMeal.data.strMealThumb} alt="meal" />
          <p>Category: <b>{getMeal.data.strCategory} | {getMeal.data.strArea} Food</b></p>
        </div>

        <div className="ingredients">
          <h4>Ingredients</h4>
          <div className="ingred-info">
            {
              // console.log(ingredients)              
              ingredients.map((ingred, index) => (
              <div className="grid-item" key={index}>›{ingred.ingredient} <small>({ingred.measure})</small></div>
              ))
            }
          </div>
          <p>visit source website: <a href={getMeal.data.strSource}> Link </a></p>
        </div>

        <div className='instruct-container'>

          <div className="instructions">
            <hr /> <u>Instructions:</u>
            <p>
              {getMeal.data.strInstructions.split('\n').map((line, index) => (
                <span key={index}>{line}<br /></span>
              ))}
            </p>
          </div>
        </div>

      </div>

      <hr />
      <a href={getMeal.data.strYoutube}>Watch video</a>
      <div className="video-container">
        <iframe width="64%" height="515" title="recipeVideo" frameBorder="0" allowFullScreen
          src={`https://www.youtube.com/embed/${getMeal.data.strYoutube.split("v=")[1]}`}>
        </iframe>
      </div>
    </div>
  );
};

export default RecipeModal;