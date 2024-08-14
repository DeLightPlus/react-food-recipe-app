import './styles.css';
import React from 'react';

function SearchRecipe({searchInput, setSearchInput, searchRecipe}) 
{
  return (
    <div className="search-recipe">
      <input className="search-input" placeholder="Search Recipe or Meal" type="search" 
        value={searchInput} onChange={(e) => {setSearchInput(e.target.value)}} onKeyDown={searchRecipe}
      />
      <button className="search-button"
        onClick={searchRecipe}>{searchInput != '' ? 'Search': '⫯'}</button>
    </div>
  );
}

export default SearchRecipe;