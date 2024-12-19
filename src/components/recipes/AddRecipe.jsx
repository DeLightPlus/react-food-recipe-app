import React, { useState } from 'react';
import axios from 'axios';
import { recipe } from '../../utils/recipe';

const AddRecipe = ({ showAddRecipeModal, setShowAddRecipeModal }) => {
  const [recipeName, setRecipeName] = useState('');
  const [drinkAlt, setDrinkAlt] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [area, setArea] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [vid_Url, setVid_Url] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [measurements, setMeasurements] = useState([]);
  const [newMeasure, setNewMeasure] = useState('');
  const [instructions, setInstructions] = useState([]);
  const [newInstruction, setNewInstruction] = useState('');
  const [source, setSource] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const [dateModified] = useState(new Date().toLocaleString().slice(0, 10));
  const [shareRecipe, setShareRecipe] = useState(false);

  const [error, setError] = useState(null);
  const [useUrl, setUseUrl] = useState(false); 

  const handleAddRecipe = async (event) => {
    event.preventDefault();
    try {
      if (!recipeName || !category || !ingredients.length || !measurements.length || !instructions.length) {
        setError('Please fill in all required fields.');
        return;
      }

      const timestamp = new Date().getTime();
      recipe.idMeal = String(timestamp).slice(-6);
      recipe.strMeal = recipeName;
      recipe.strDrinkAlternate = drinkAlt || null;
      recipe.strCategory = category;
      recipe.strArea = area;
      recipe.strInstructions = stringifyInstructions();
      recipe.strMealThumb = imageUrl;
      recipe.strTags = tags;
      recipe.strYoutube = vid_Url || '';
      recipe.strSource = source;
      recipe.strImageSource = imageUrl;
      recipe.dateModified = dateModified;
      recipe.strPreparationTime = prepTime;
      recipe.strCookingTime = cookTime;
      recipe.servings = servings;

      for (let i = 0; i < ingredients.length; i++) {
        recipe[`strIngredient${i + 1}`] = ingredients[i];
        recipe[`strMeasure${i + 1}`] = measurements[i];
      }

      recipe.addedBy = JSON.parse(sessionStorage.getItem('user')).user_id;
      recipe.strCreativeCommonsConfirmed = shareRecipe ? 'public' : 'private';

      const endpoint = shareRecipe ? 'http://localhost:8000/recipes' : 'http://localhost:8000/favoured-recipes';
      const response = await axios.post(endpoint, recipe);

      alert('Recipe added successfully!');
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddIngredient = (event) => {
    event.preventDefault();
    if (ingredients.length < 20 && newIngredient) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient('');
    } else {
      alert('You have reached the maximum number of ingredients (20)');
    }
  };

  const handleAddMeasurement = (event) => {
    event.preventDefault();
    if (measurements.length < 20 && newMeasure) {
      setMeasurements([...measurements, newMeasure]);
      setNewMeasure('');
    } else {
      alert('You have reached the maximum number of measurements (20)');
    }
  };

  const handleAddInstruction = (event) => {
    event.preventDefault();
    if (instructions.length < 20 && newInstruction) {
      setInstructions([...instructions, newInstruction]);
      setNewInstruction('');
    } else {
      alert('You have reached the maximum number of instructions (20)');
    }
  };

  const stringifyInstructions = () => {
    return instructions.map((instruction, index) => `Step ${index + 1}: ${instruction}`).join('\n');
  };

  const handleImageChange = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setImageUrl(url); // Use the object URL to display the image
        setImage(file);
      }
    }
  };

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
    setImage(null); // Clear the file state if a URL is entered
  };

  const toggleUseUrl = () => {
    setUseUrl(!useUrl); // Toggle between file upload and URL input
    setImageUrl(''); // Reset the image URL when switching modes
    setImage(null); // Clear the file state when switching modes
  };

  return (
    <div className="AddRecipe">
      <h2>Add Recipe</h2>
      <form onSubmit={handleAddRecipe}>
        <div className='recipe-details'>

          <label className='input-box'>
            <span>Recipe Name:</span>
            <input
              type="text"
              value={recipeName}
              placeholder="Name of your recipe"
              onChange={(event) => setRecipeName(event.target.value)}
            />
          </label>

          <label className='input-box'>
            <span>Category:</span>
            <input
              type="text"
              value={category}
              placeholder="e.g. Side, Veg, Dessert"
              onChange={(event) => setCategory(event.target.value)}
            />
          </label>    

          <label className='input-box'>
            <span>Area (Optional):</span>
            <input
              type="text"
              value={area}
              placeholder="e.g., South African"
              onChange={(event) => setArea(event.target.value)}
            />
          </label>

          <label className='input-box'>
            <span>Tags (Optional):</span>
              <input
                type="text"
                value={tags}
                placeholder="e.g., StreetFood, FastFood"
                onChange={(event) => setTags(event.target.value)}
              />
          </label>
        </div>

        <div className='recipe-details' id='ingreNmeasure'>
          
            <label className="input-box">
              <span>Ingredients:</span>
              <input
                value={newIngredient}
                placeholder="Ingredient"
                onChange={(event) => setNewIngredient(event.target.value)}
              />
              <button onClick={handleAddIngredient}>Add Ingredient</button>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </label>
        

          
            <label className='input-box'>Measurements:
              <input
                value={newMeasure}
                placeholder="Measurement for Ingredient"
                onChange={(event) => setNewMeasure(event.target.value)}
              />
              <button onClick={handleAddMeasurement}>Add Measurement</button>
              <ul>
                {measurements.map((measure, index) => (
                  <li key={index}>{measure}</li>
                ))}
              </ul>
            </label>
                
        </div>

        <div className="instructions-section">
            <label>Instructions:</label>
            <input
              value={newInstruction}
              placeholder={`Step ${instructions.length + 1}`}
              onChange={(event) => setNewInstruction(event.target.value)}
            />
            <button onClick={handleAddInstruction}>Add Instruction</button>
            <pre>{stringifyInstructions()}</pre>
        </div>

        <div className='recipe-details'>
          <label className='input-box'>
            <span>Preparation Time:</span>
            <input
              value={prepTime}
              placeholder="e.g., 0 Hours: 20 Mins"
              onChange={(e) => setPrepTime(e.target.value)}
            />
          </label>

          <label className='input-box'>
            <span>Cooking Time:</span>
            <input
              value={cookTime}
              placeholder="e.g., 0 Hours: 30 Mins"
              onChange={(e) => setCookTime(e.target.value)}
            />
          </label>

          <label className='input-box'>
            Servings:
            <input
              value={servings}
              placeholder="e.g., 4"
              onChange={(e) => setServings(e.target.value)}
            />
          </label>
        </div>

        <div className='recipe-details'>
          <label className='input-box'>
              
            <button onClick={toggleUseUrl}>
                {useUrl ? 'Switch to File Upload' : 'Switch to URL Input'}
            </button>      

            {useUrl ? (
              <>
                <br />
                <label>Enter Image URL:</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={handleUrlChange}
                  placeholder="Enter image URL"
                />
              </>
            ) : (
              <>
                <br />
                <input type="file" onChange={handleImageChange} />
              </>
            )}
          </label>

          <label className='input-box'>
            {imageUrl && <img src={imageUrl} alt="Recipe" width="200" height="200" />}
          </label>
        </div>

        <div className='recipe-details'>
          <label className='input-box'>
            <span>Source:</span>
            <input value={source} placeholder="Source link" onChange={(e) => setSource(e.target.value)} />
          </label>
        
          <label className='input-box'>
            <span>Video (Optional):</span>
            <input value={vid_Url} placeholder="YouTube video link" onChange={(e) => setVid_Url(e.target.value)} />
          </label>
        </div>

        <div>
          <label>Share Recipe:</label>
          <input
            type="checkbox"
            onChange={(e) => setShareRecipe(e.target.checked)}
          />
        </div>

        <button type="submit">Post Recipe</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

  <div className="close">
    <button onClick={() => setShowAddRecipeModal(!showAddRecipeModal)}>Close</button>
  </div>
</div>

  );
};

export default AddRecipe;
