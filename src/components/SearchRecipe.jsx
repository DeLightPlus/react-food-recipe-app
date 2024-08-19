import './styles.css';
import React from 'react';

function SearchRecipe({searchInput, setSearchInput, handleSearch}) 
{
  return (
    <div className="search-recipe">
      <select onChange={(e) => { console.log('Category:', e.target.value); } } >
        <option value="">Category</option>
        <option value="Miscellaneous">Miscellaneous</option>
        <option value="Seafood">Seafood</option>
        <option value="">Desset</option>
        <option value="">Side</option>
        <option value="">Beef</option>
      </select>
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