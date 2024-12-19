import './App.css';

import Navbar from './components/Header.jsx';
import LoginModal from './components/auth/LoginModal.jsx';
import RegisterModal from './components/auth/RegisterModal.jsx';

import RecipeComponent from './components/recipes/Recipes.jsx';


import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './components/Home.jsx';

function FoodRecipeApp() {
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null);

  const [viewMode, setViewMode] = useState('allRecipes'); // States: 'allRecipes', 'favouredRecipes', 'searchResults'
  const [searchInput, setSearchInput] = useState('');
  const [recipeList, setRecipeList] = useState([]);
  const [favouredRecipes, setFavouredRecipes] = useState([]);


  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoginModal, setModal] = useState(false);
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);

  // Effect hook to fetch all recipes from the API when the component mounts
  useEffect(() => {
    fetchAllRecipes();
  }, []);

  // Fetch all recipes from the server
  const fetchAllRecipes = () => {
    const url = `http://localhost:8000/recipes`; // Fetch all recipes
    axios.get(url)
      .then(response => {
        setRecipeList(response.data); // Store all recipes
        console.log("res.data: ", response.data)
      })
      .catch(error => {
        console.error('Error fetching all recipes:', error);
      });
  };

  // Handle fetching the list of favoured recipes for the logged-in user
  const handleFavouredRecipes = () => {
    if (loggedInUser) {
      const url = `http://localhost:8000/favoured-recipes?user_id=${loggedInUser.user_id}`; // Fetch favoured recipes
      axios.get(url)
        .then(response => {
          setFavouredRecipes(response.data); // Store favoured recipes
        })
        .catch(error => {
          console.error('Error fetching favoured recipes:', error);
        });
    }
  };

  // Perform the search query for recipes using the local backend
  const searchRecipe = () => {
    if (searchInput.trim() !== '') {
      const url = `http://localhost:8000/recipes?query=${searchInput}`; // Query the local API with search term
      axios.get(url)
        .then(response => {
          setRecipeList(response.data); // Set search results
          setSearchInput('');
          setViewMode('searchResults');
        })
        .catch(error => {
          console.error('Error searching recipes:', error);
        });
    }
  };

  // Handle search key press or click
  const handleSearch = (e) => {
    e.preventDefault();
    if (e.key === 'Enter' || e.type === 'click') {
      searchRecipe();
    }
  };

  // Handle user logout
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setLoggedInUser(null);
    setViewMode('allRecipes');
  };

  return (
    <BrowserRouter>
      <div className="RecipeApp">
        <Navbar
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
          isLoginModal={isLoginModal}
          setModal={setModal}

          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}

          searchInput={searchInput}
          setSearchInput={setSearchInput}          
          handleSearch={handleSearch}
          
          setShowAddRecipeModal={setShowAddRecipeModal}
          handleLogout={handleLogout}
        />
        <main>
          <Routes>           
            
            <Route path="/" 
              element={ 
              <HomePage 
                recipeList={ recipeList }  
                loggedInUser={loggedInUser}
                showAddRecipeModal={showAddRecipeModal} 
                setShowAddRecipeModal={setShowAddRecipeModal} 
              /> 
            }/>           

            {/* Login/Register Modals */}
            {!loggedInUser ? (
              <>
                <Route path="/login" element={ 
                  <LoginModal 
                    showLoginModal={showLoginModal}
                    setShowLoginModal={setShowLoginModal} 
                  /> 
                }/>

                <Route path="/register" element={
                  <RegisterModal 
                    showLoginModal={showLoginModal}
                    setShowLoginModal={setShowLoginModal} 
                  /> 
                }/>


              </>
            ) : (
              <>
                <Route path="/" 
                  element={ 
                  <HomePage 
                    recipeList={ recipeList }  
                    
                    loggedInUser={loggedInUser}
                    showAddRecipeModal={showAddRecipeModal} 
                    setShowAddRecipeModal={setShowAddRecipeModal} 
                  /> 
                  } 
                />  
                {/* Favoured Recipes */}
                {/* {viewMode === 'favouredRecipes' && (
                  <Route
                    path="/favoured-recipes"
                    element={<MyRecipe recipeList={favouredRecipes} />}
                  />
                )} */}

                {/* Search Results */}
                {/* {viewMode === 'searchResults' && (
                  <Route
                    path="/search-results"
                    element={<Meal recipeList={recipeList} />}
                  />
                )} */}
              </>
            )}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default FoodRecipeApp;
