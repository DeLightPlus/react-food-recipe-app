import { useState } from 'react';
import './App.css';
import Navbar from './components/NavBar';
import SearchRecipe from './components/SearchRecipe';

function FoodRecipeApp() 
{
  const[searchInput,setSearchInput]=useState("");
  const[recipe, setRecipe]=useState();

  const searchRecipe = (e) =>
  {   
    console.log(e);
    
    if(e.key == "Enter" || e.type == "click")
    {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
      fetch(url)
      .then(res=>res.json())
      .then(
        data => 
        { 
          setRecipe(data.meals); 
          console.log(data.meals);
          setSearchInput(""); 
        })       
    }

    console.log(recipe);    
  }

  return (
    <>
      <div className="RecipeApp">
        <header>
          <Navbar />
        </header> 

        <main>
          <SearchRecipe 
            searchInput={searchInput} 
            setSearchInput={setSearchInput}

            searchRecipe={searchRecipe} 
          />
        </main> 
      </div>    
    </>
  )
}

export default FoodRecipeApp;
