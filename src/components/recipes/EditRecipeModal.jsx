import React, { useState, useEffect } from 'react';
import SaveUpdatedRecipe from '../../utils/SaveUpdatedRecipe.js'; // Assuming this function exists for saving the recipe

const EditRecipeModal = ({ data, showEditRecipeModal, setShowEditRecipeModal }) => {
  const [updatedRecipe, setUpdatedRecipe] = useState({
    strMeal: data.strMeal,
    strCategory: data.strCategory,
    strArea: data.strArea,
    strInstructions: data.strInstructions,
    strTags: data.strTags || '',
    strDrinkAlternate: data.strDrinkAlternate || '',
  });

  const [ingredients, setIngredients] = useState(
    Object.keys(data)
      .filter((key) => key.startsWith('strIngredient'))
      .map((key, index) => ({
        ingredient: data[key],
        measure: data[`strMeasure${index + 1}`] || '',
      }))
  );

  const handleUpdateRecipe = async () => {
    const isUpdated = await SaveUpdatedRecipe(data.idMeal, updatedRecipe, ingredients);
    if (isUpdated) {
      setShowEditRecipeModal(false);
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].ingredient = value;
    setIngredients(newIngredients);
  };

  const handleMeasureChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index].measure = value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, { ingredient: '', measure: '' }]);
  };

  const removeIngredientField = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  return (
    <div className={`Edit-Recipe-Modal`} id={`${showEditRecipeModal ? 'active' : ''}`}>
      <button
        className="close"
        onClick={() => setShowEditRecipeModal(!showEditRecipeModal)}
      >
        <div className="icn">&#11178;</div>
      </button>

      <div className="info">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <label>Recipe Name:</label>
            <input
              type="text"
              value={updatedRecipe.strMeal}
              onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, strMeal: e.target.value })}
            />
          </div>

          <div>
            <label>Category:</label>
            <input
              type="text"
              value={updatedRecipe.strCategory}
              onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, strCategory: e.target.value })}
            />
          </div>

          <div>
            <label>Area:</label>
            <input
              type="text"
              value={updatedRecipe.strArea}
              onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, strArea: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <label htmlFor="">Tags:</label>
            <input
              type="text"
              value={updatedRecipe.strTags}
              onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, strTags: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="">Drink Alternative:</label>
            <input
              type="text"
              value={updatedRecipe.strDrinkAlternate}
              onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, strDrinkAlternate: e.target.value })}
            />
          </div>
        </div>

        <div className="ingredients">
          <h4>Ingredients</h4>
          {ingredients.map((ingred, index) => (
            <div key={index} style={{ display: 'flex', marginBottom: '8px' }}>
              <input
                type="text"
                value={ingred.ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder="Ingredient"
                style={{ flex: 1, marginRight: '8px' }}
              />
              <input
                type="text"
                value={ingred.measure}
                onChange={(e) => handleMeasureChange(index, e.target.value)}
                placeholder="Measurement"
                style={{ flex: 1 }}
              />
              <button type="button" onClick={() => removeIngredientField(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addIngredientField}>
            Add Ingredient
          </button>
        </div>

        <div className="instructions">
          <label>Instructions:</label>
          <textarea
            value={updatedRecipe.strInstructions}
            onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, strInstructions: e.target.value })}
          />
        </div>

        <button className="update" onClick={handleUpdateRecipe}>
          <div className="icn">Update Recipe</div>
        </button>
      </div>
    </div>
  );
};

export default EditRecipeModal;
