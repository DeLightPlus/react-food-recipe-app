import React, { useState } from 'react';
import axios from 'axios';

const AddRecipe = () => 
{
  const [recipeName, setRecipeName] = useState('');
  const [drinkAlt, setDrinkAlt] = useState(null);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [area, setArea] = useState('');

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

//   const [image, setImage] = useState(null);
  const [vid_Url, setVid_Url] = useState('');
  
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');

  const [measurements, setMeasurements] = useState([]);
  const [newMeasure, setNewMeasure] = useState('');

  const [instructions, setInstructions] = useState([]);
  const [newInstruction, setNewInstruction] = useState('');

  const [source, setSource] = useState("");  
  const [dateModified, setDateModified] = useState(null);

  const [error, setError] = useState(null);

  const handleAddRecipe = async (event) => 
  {
    event.preventDefault();
    try 
    {
      const formData = new FormData();
      formData.append('name', recipeName);
      formData.append('ingredients', ingredients);
      formData.append('instructions', instructions);
      formData.append('image', image);

      const response = await axios.post('http://localhost:8000/recipes', formData);
      console.log(response.data);
      alert('Recipe added successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddIngredient = (event) => 
  {
    event.preventDefault();
    setIngredients([...ingredients, newIngredient]);
    setNewIngredient('');

    if (ingredients.length < 20) 
    {
        setIngredients([...ingredients, newIngredient]);
        setNewIngredient('');
    } else {   alert('You have reached the maximum number of ingredients (20)');    }    
    
  };

  const handleAddMeasurement = (event) => 
    {
      event.preventDefault();
      setMeasurements([...measurements, newMeasure]);
      setNewMeasure('');
  
      if (measurements.length < 20) 
      {
        setMeasurements([...measurements, newMeasure]);
        setNewMeasure('');
      } else {   alert('You have reached the maximum number of ingredients measurements (20)');    }    
      
    };

  const handleAddInstruction = (event) => {
    event.preventDefault();
    if (instructions.length < 20) {
      setInstructions([...instructions, newInstruction]);
      setNewInstruction('');
    } else {
      alert('You have reached the maximum number of instructions (20)');
    }
  };

  const stringifyInstructions = () => {
    return instructions.map((instruction, index) => `Step ${index + 1}: ${instruction}`).join('\n');
  };

  const handleImageChange = (event) => 
  {
    setImage(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className='AddRecipe'>
      <h2>Add Recipe</h2>
      <form onSubmit={handleAddRecipe}>
        <div style={{display:'flex'}}>
            <label>
                Recipe Name:
                <input type="text" value={recipeName} placeholder='Name of your recipe' 
                    onChange={(event) => setRecipeName(event.target.value)} />
            </label>           

            <label>
                Drink:
                <input type="text" value={drinkAlt} placeholder='Alternative' 
                    onChange={(event) => setDrinkAlt(event.target.value)} />
            </label>            

            <label>
                Category:
                <input type="text" value={category} placeholder='eg. Side, Veg, Dessert, ...'
                    onChange={(event) => setCategory(event.target.value)} />
            </label>

            <label>
                Area:
                <input type="text" value={area} placeholder='eg, South African'
                    onChange={(event) => setArea(event.target.value)} />
            </label>

            <label>
                Tags:
                <input type="text" value={tags} placeholder='eg, StreetFood, FastFood, OnTheGo'
                    onChange={(event) => setTags(event.target.value)} />
            </label>           

        </div> 

        <div className='add-row'>

            <div className='add-column' id='img-src-vid'>
                <label>
                    Image:
                    <input type="file" onChange={handleImageChange} />
                </label>
                <br />
                {
                    imageUrl && 
                    (
                        <img src={imageUrl} alt="Uploaded Image" width="200" height="200" />
                    )
                }
                <label style={{alignSelf:'start'}}>
                    Source: <input value={source} placeholder='source link/url'
                                onChange={(e) => setSource(e.target.value)} />
                </label>
                <label >
                    Video: <input value={vid_Url} placeholder='youtube link/url'
                                onChange={(e) => setVid_Url(e.target.value)}/>
                </label>
            </div>   
                       
            <div className='add-column' id='ingredients'>
                {
                    (ingredients.length < 20) && 
                    <>
                        <label>Ingredient: </label>
                        <input value={newIngredient} placeholder={`Ingredient ${ingredients.length+1}:`}
                            onChange={(event) => setNewIngredient(event.target.value)} />
                        <button onClick={handleAddIngredient}>Add {(ingredients.length < 20) && 20 - ingredients.length}</button>
                    </>
                }                    

                <ul className='add-ingredients'><p>Ingredients:</p>
                    {/* {console.log(ingredients)} */}
                    {   
                        ingredients.map((ingredient, index) => ( <li key={index}>{index+1}. {ingredient}</li> ))
                    }
                </ul>
            </div>

            <div className='add-column' id='measures'>
                {
                    (measurements.length < 20) && 
                    <>
                        <label>Measure</label>
                        <input value={newMeasure} placeholder={`Measure For Ingredient ${measurements.length+1}`}
                            onChange={(event) => setNewMeasure(event.target.value)} />
                        <button onClick={handleAddMeasurement}>Add {(measurements.length < 20) && 20 - measurements.length}</button>
                    </>
                }   
                <ul className='add-ingredients'><p>Measures</p>
                    {/* {console.log(ingredients)} */}
                    {   
                        measurements.map((measure, index) => ( <li key={index}>measure{index+1}: {measure}</li> ))
                    }
                </ul>
            </div>            

            <div className='add-column' id='instructions'>
                {
                    (instructions.length < 20) && 
                    <>
                        <label> Add Instruction: </label>
                        <input value={newInstruction} placeholder={`instruction, Step ${instructions.length+1}`}
                            onChange={(event) => setNewInstruction(event.target.value)} />
                        <button onClick={handleAddInstruction}>Add (Step {instructions.length+1})</button>
                    </>
                }               
                
                {/* <h2>Instructions:</h2>
                <ol className='instructions'>
                    {instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                    ))}
                </ol> */}

                <p>Instructions :</p> {/* (stringified) */}
                <pre>{stringifyInstructions()}</pre>
                <br />
            </div>

        </div>
        
        <button type="submit" id="add_recipe_btn">Add Recipe</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddRecipe;