import '../styles.css';
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
        onClick={handleSearch}> {searchInput != '' ? '🔍': '🍳'} </button>
    </div>
  );
}

export default SearchRecipe;


// import React, { useState } from "react";
// import "./SearchInput.css"; // Import the CSS for styling

// const SearchInput = () => {
//   const [query, setQuery] = useState(""); // State for the input value

//   const handleChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const clearInput = () => {
//     setQuery(""); // Clear the search input
//   };

//   return (
//     <div className="search-container">
//       <div className="input-wrapper">
//         <div className="icon">
//           🔍 {/* UTF-8 Search Icon */}
//         </div>
//         <input
//           type="text"
//           value={query}
//           onChange={handleChange}
//           placeholder="Type to search..."
//           className="search-input"
//         />
//         {query && (
//           <button className="clear-btn" onClick={clearInput}>
//             &times;
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchInput;
