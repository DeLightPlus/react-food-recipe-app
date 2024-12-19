import React, { useState, useEffect } from 'react';
import SaveFavoredRecipe from '../../utils/SaveFavoured.js';
import axios from 'axios';

const RecipeModal = ({ data, ingredients, showRecipeDetails, setShowRecipeDetails }) => 
{
  const [isFav, setIsFavoured] = useState(false);
  const handleToggleFav = async () => 
    {
      const isNowFav = await SaveFavoredRecipe(data.idMeal);
      setIsFavoured(isNowFav);
    }

    const handleDeleteRecipe = async () => 
    {
      // console.log(data.id)
      try 
      {
        await axios.delete(`http://localhost:8000/recipes/${data.id}`);
        alert('Recipe deleted successfully');
        setShowRecipeDetails(false); // Close the modal after deletion
      } 
      catch (error) 
      {
        console.error('Error deleting recipe:', error);
        alert('Failed to delete the recipe. Please try again.');
      }
    };

  return (
    <div className={`recipe-modal`} id={`${showRecipeDetails ? 'active' : ''}`} 
      // style={{ backgroundImage: `url(${data.strMealThumb})` }}
      // style={{ backgroundImage: `url(${data.strMealThumb})` }}
      >
        { console.log(data) }

      <div className="btn-container">
        <button className="rec-close" onClick={() => setShowRecipeDetails(false)}>
          <div className="icn">&#11178;</div>
        </button>

        {  
          isFav &&   
          <button className="rec-edit" onClick={handleToggleFav}>
            <div className="icn">&#128221;</div>
          </button>
        }        

        <button className="rec-save" onClick={handleToggleFav}>
          <div className="icn">&#11088;</div>
        </button>

        <button className="rec-save" onClick={handleDeleteRecipe}>
          <div className="icn">&#128465;</div>
        </button>
      </div>

      <div className="info" style={{ display: 'flex' }}>
        <div>
          <strong>{data.strMeal}</strong><br />
          <img src={data.strMealThumb} alt="meal" />
          <p>Category: <b>{data.strCategory} | {data.strArea} Food</b></p>
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
          <p>visit source website: <a href={data.strSource}> Link </a></p>
        </div>

        <div className='instruct-container'>
          <div className="instructions">
            <hr /> <u>Instructions:</u>
            <p>
              {data.strInstructions.split('\n').map((line, index) => (
                <span key={index}>{line}<br /></span>
              ))}
            </p>
          </div>
        </div>

      </div>

      <hr />
      <a href={data.strYoutube}>Watch video</a>
      <div className="video-container">
        <iframe width="64%" height="515" title="recipeVideo" frameBorder="0" allowFullScreen
          src={`https://www.youtube.com/embed/${data.strYoutube.split("v=")[1]}`}>
        </iframe>
      </div>
    </div>
  );
};

export default RecipeModal;