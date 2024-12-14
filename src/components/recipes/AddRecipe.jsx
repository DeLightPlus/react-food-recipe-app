import React, { useState } from 'react';
import axios from 'axios';
import { recipe } from './recipe';

const AddRecipe = ({ showAddRecipeModal, setShowAddRecipeModal }) => {
  // State object for better organization
  const [formData, setFormData] = useState({
    recipeName: '',
    drinkAlt: '',
    category: '',
    tags: '',
    area: '',
    image: null,
    imageUrl: '',
    vid_Url: '',
    ingredients: [],
    measurements: [],
    instructions: [],
    source: '',
    dateModified: new Date().toLocaleString().slice(0, 9),
    prepTime: '',    // Added Preparation Time
    cookTime: '',    // Added Cooking Time
    servings: '',    // Added Serving Size
  });
  
  const [shareRecipe, setShareRecipe] = useState(false);
  const [error, setError] = useState(null);

  // Generic handler for setting form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddIngredient = (event) => {
    event.preventDefault();
    if (formData.ingredients.length < 20) {
      setFormData((prevState) => ({
        ...prevState,
        ingredients: [...prevState.ingredients, formData.newIngredient],
        newIngredient: '',
      }));
    } else {
      alert('You have reached the maximum number of ingredients (20)');
    }
  };

  const handleAddMeasurement = (event) => {
    event.preventDefault();
    if (formData.measurements.length < 20) {
      setFormData((prevState) => ({
        ...prevState,
        measurements: [...prevState.measurements, formData.newMeasure],
        newMeasure: '',
      }));
    } else {
      alert('You have reached the maximum number of measurements (20)');
    }
  };

  const handleAddInstruction = (event) => {
    event.preventDefault();
    if (formData.instructions.length < 20) {
      setFormData((prevState) => ({
        ...prevState,
        instructions: [...prevState.instructions, formData.newInstruction],
        newInstruction: '',
      }));
    } else {
      alert('You have reached the maximum number of instructions (20)');
    }
  };

  const stringifyInstructions = () => {
    return formData.instructions
      .map((instruction, index) => `Step ${index + 1}: ${instruction}`)
      .join('\n');
  };

  const handleImageChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      image: event.target.files[0],
      imageUrl: URL.createObjectURL(event.target.files[0]),
    }));
  };

  const handleAddRecipe = async (event) => {
    event.preventDefault();
    try 
    {
      const timestamp = new Date().getTime();

      // Populate recipe object
      const newRecipe = { ...recipe };
      newRecipe.idMeal = String(timestamp).slice(-6);
      newRecipe.strMeal = formData.recipeName;
      newRecipe.strDrinkAlternate = formData.drinkAlt;
      newRecipe.strCategory = formData.category;
      newRecipe.strArea = formData.area;
      newRecipe.strInstructions = stringifyInstructions();
      newRecipe.strMealThumb = formData.imageUrl;
      newRecipe.strTags = formData.tags;
      newRecipe.strYoutube = formData.vid_Url;
      newRecipe.strPrepTime = formData.prepTime;    // Added Preparation Time
      newRecipe.strCookTime = formData.cookTime;    // Added Cooking Time
      newRecipe.strServings = formData.servings;    // Added Serving Size

      formData.ingredients.forEach((ingredient, index) => {
        newRecipe[`strIngredient${index + 1}`] = ingredient;
        newRecipe[`strMeasure${index + 1}`] = formData.measurements[index];
      });

      newRecipe.strSource = formData.source;
      newRecipe.strImageSource = formData.imageUrl;
      newRecipe.strCreativeCommonsConfirmed = true;
      newRecipe.dateModified = formData.dateModified;

      // Post request based on shareRecipe flag
      if (shareRecipe) 
      {
        alert('Notice that you won\'t be able to edit or update the recipe');
        await axios.post('http://localhost:8000/recipes', newRecipe);
        alert('Recipe added successfully!');
      }
      else 
      {
        await axios.post('http://localhost:8000/favoured-recipes', newRecipe);
      }

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="AddRecipe">
      <h2>Add Recipe</h2>
      <form onSubmit={handleAddRecipe}>
        {/* Recipe Info Section */}
        <div className="add-row">
          <label>
            Recipe Name:
            <input
              type="text"
              name="recipeName"
              value={formData.recipeName}
              placeholder="Name of your recipe"
              onChange={handleChange}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              placeholder="e.g., Side, Veg, Dessert"
              onChange={handleChange}
            />
          </label>
        </div>

        <div className='add-column'>
          <label>
            Drink Alternate:
            <input
              type="text"
              name="drinkAlt"
              value={formData.drinkAlt}
              placeholder="Alternative"
              onChange={handleChange}
            />
          </label>
          <label>
            Area:
            <input
              type="text"
              name="area"
              value={formData.area}
              placeholder="e.g., South African"
              onChange={handleChange}
            />
          </label>
          <label>
            Tags:
            <input
              type="text"
              name="tags"
              value={formData.tags}
              placeholder="e.g., StreetFood, FastFood"
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Time and Serving Section */}
        <div className="add-column">
          <label>
            Preparation Time:
            <input
              type="text"
              name="prepTime"
              value={formData.prepTime}
              placeholder="e.g., 10 minutes"
              onChange={handleChange}
            />
          </label>
          <label>
            Cooking Time:
            <input
              type="text"
              name="cookTime"
              value={formData.cookTime}
              placeholder="e.g., 30 minutes"
              onChange={handleChange}
            />
          </label>
          <label>
            Servings:
            <input
              type="number"
              name="servings"
              value={formData.servings}
              placeholder="e.g., 4"
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="add-row">
          {/* Ingredients Section */}
          <div className="add-column">
            <h4>Ingredients</h4>
            <input
              name="newIngredient"
              value={formData.newIngredient}
              placeholder={`Ingredient ${formData.ingredients.length + 1}`}
              onChange={handleChange}
            />
            <button onClick={handleAddIngredient}>Add Ingredient</button>
            <ul>
              {formData.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          {/* Measurements Section */}
          <div className="add-column">
            <h4>Measurements</h4>
            <input
              name="newMeasure"
              value={formData.newMeasure}
              placeholder={`Measure for Ingredient ${formData.measurements.length + 1}`}
              onChange={handleChange}
            />
            <button onClick={handleAddMeasurement}>Add Measurement</button>
            
            <ul>
              {formData.measurements.map((measure, index) => (
                <li key={index}>Measurement {index + 1}: {measure}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="add-column">
          <h4>Instructions</h4>
          <input
            name="newInstruction"
            value={formData.newInstruction}
            placeholder={`Step ${formData.instructions.length + 1}`}
            onChange={handleChange}
          />
          <button onClick={handleAddInstruction}>Add Instruction</button>
          <pre>{stringifyInstructions()}</pre>
        </div>
        

        {/* Image and Video Section */}
        <div className="add-column">
          {formData.imageUrl && (
            <img src={formData.imageUrl} alt="Uploaded" width="200" height="200" />
          )}

          <input value={formData.imageUrl} type="text" onChange={handleImageChange} />

          <label>
            Source: 
            <input
              name="source"
              value={formData.source}
              placeholder="Source URL"
              onChange={handleChange}
            />
          </label>

          <label>
            Video URL: 
            <input
              name="vid_Url"
              value={formData.vid_Url}
              placeholder="YouTube Link"
              onChange={handleChange}
            />
          </label>
        </div>

        <label>Date Updated: {formData.dateModified}</label>

        {/* Share Recipe and Submit Button */}
        <div>
          Share Recipe:
          <input
            type="checkbox"
            onChange={(e) => setShareRecipe(e.target.checked)}
          />
          <button type="submit">Post Recipe</button>
        </div>
      </form>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="close">
        <button onClick={() => setShowAddRecipeModal(!showAddRecipeModal)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AddRecipe;
