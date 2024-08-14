import './App.css';

import Navbar from './components/NavBar.jsx';
import SearchRecipe from './components/SearchRecipe';
import LoginModal from './components/LoginModal.jsx';
import RegisterModal from './components/RegisterModal.jsx';

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function FoodRecipeApp() 
{
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoginModal, setModal] = useState(true);

  const[searchInput,setSearchInput]=useState("");
  const[recipe, setRecipe]=useState();

  // console.log('modalOpen ', showLoginModal, ',isLogin ',isLoginModal);  

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
    if(recipe)
      console.log(recipe);    
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
            searchRecipe={searchRecipe} 
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
            ):( <Route path='/' element={<>home</>} /> )}
            
          </Routes>
        
          
        </main> 
      </div>
      
      </BrowserRouter>    
    </>
  )
}

export default FoodRecipeApp;
