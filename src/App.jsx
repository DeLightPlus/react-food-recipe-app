import './App.css';

import Navbar from './components/NavBar.jsx';
import SearchRecipe from './components/SearchRecipe';
import LoginModal from './components/LoginModal.jsx';
import RegisterModal from './components/RegisterModal.jsx';
import Meal from './components/Meal.jsx';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function FoodRecipeApp() 
{
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoginModal, setModal] = useState(true);

  const[searchInput,setSearchInput]=useState("");
  const[recipeList, setRecipeList]=useState();

  // console.log('modalOpen ', showLoginModal, ',isLogin ',isLoginModal);  
  useEffect(() => { searchRecipe(); }, [])

  const searchRecipe = () => 
  {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    axios.get(url)
      .then(response => 
      {
        setRecipeList(response.data.meals);
        console.log(response.data.meals);
        setSearchInput("");
      })
      .catch(error => { console.error(error); });
  }
    
  const handleSearch = (e) =>
  {   
    console.log(e); 
   
    if(e.key == "Enter" || e.type == "click")
    {
      searchRecipe();     
    }        
  }
  

  return (
    <><BrowserRouter>
      <div className="RecipeApp">
        <header>
          <Navbar
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
            isLoginModal={isLoginModal}
            setModal={setModal}
          />
        </header> 

        <main>
          <SearchRecipe
            searchInput={searchInput} 
            setSearchInput={setSearchInput}
            handleSearch={handleSearch} 
          />

          <Routes>
          { showLoginModal ? 
            ( 
              isLoginModal ?    
              (

                < Route path='/login' 
                  element={
                    <LoginModal 
                      showLoginModal={showLoginModal}
                      setShowLoginModal={setShowLoginModal}
                    />}
                />

              ) : (

                < Route path='/register' 
                  element={
                  <RegisterModal 
                      showLoginModal={showLoginModal}
                      setShowLoginModal={setShowLoginModal}
                  />} 
                />

              ) 
            ):( <Route path='/' element={<Meal recipeList={recipeList}/>} /> )}
            
          </Routes>
        
          
        </main> 
      </div>
      
      </BrowserRouter>    
    </>
  )
}

export default FoodRecipeApp;
