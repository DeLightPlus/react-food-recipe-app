import './styles.css';
import React from 'react';

function SearchRecipe({searchInput, setSearchInput, handleSearch}) 
{
  return (
    <div className="search-recipe">      
      <input className="search-input" placeholder="Search Recipe or Meal" type="search" 
        value={searchInput} 
        onChange={(e) => {setSearchInput(e.target.value)}} 
        onKeyDown={handleSearch}
      />
      <button className="search-button"
        onClick={handleSearch}> {searchInput != '' ? 'Search': '🍳'} </button>
    </div>
  );
}

export default SearchRecipe;