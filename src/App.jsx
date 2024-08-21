import './App.css';

import Navbar from './components/NavBar.jsx';
import LoginModal from './components/LoginModal.jsx';
import RegisterModal from './components/RegisterModal.jsx';
import Meal from './components/Meal.jsx';
import MyRecipe from './components/MyRecipe.jsx';
import addRecipe from './components/AddRecipe.jsx';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import AddRecipe from './components/AddRecipe.jsx';




function FoodRecipeApp() 
{  
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoginModal, setModal] = useState(true);  

  const[searchInput,setSearchInput]=useState("");
  const[recipeList, setRecipeList]=useState();

  const [showMyRecipeList, setShowMyRecipeList] = useState(false);
  const[myRecipeList, setMyRecipeList]=useState([]);

  useEffect(() => 
    {
      if(searchInput === '')
        searchRecipe(); 

        let user = sessionStorage.getItem('user')
        console.log(user);
        
        if(user !== '' || user !== null)
        {
          setLoggedInUser(JSON.parse(user));
          console.log(loggedInUser);
          
          if(loggedInUser !== null)
          {
            console.log('logged in: ', loggedInUser.isLoggedIn);
            // setShowLoginModal(false);  
            handleMyRecipeList();       
          }            
          else console.log('no user loggedIn');
               
        }

     }, []);

  const handleMyRecipeList = () =>
  {
    const url = `http://localhost:8000/recipes`;
    axios.get(url)
    .then(response => { setMyRecipeList(response.data); console.log('myList',response.data) })
    .catch(error => { console.error(error);  });    

  }

  const searchRecipe = () => 
  {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
    axios.get(url)
      .then(response => 
      {
        setRecipeList(response.data.meals);
        console.log(response.data.meals);
        setSearchInput("");
        setShowMyRecipeList(false);
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

            loggedInUser={loggedInUser}
            setLoggedInUser={setLoggedInUser}

            searchInput={searchInput} 
            setSearchInput={setSearchInput}
            handleSearch={handleSearch}

            showMyRecipeList={showMyRecipeList}
            setShowMyRecipeList={setShowMyRecipeList}
          />
        </header> 

        <main>         

          <Routes>
          { showLoginModal ? //checkLoggedIn
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


            ):( <>                

                  {
                    // !showMyRecipeList &&
                    <Route path='/' element={
                      <Meal 
                        showMyRecipeList={showMyRecipeList}
                        recipeList={recipeList}                             
                        myRecipeList={myRecipeList} 
                        setMyRecipeList={setMyRecipeList} 
                      />}
                    />
                  }                  

                  <Route path="/myRecipes" element={
                    <MyRecipe
                      showMyRecipeList={showMyRecipeList}
                      recipeList={recipeList}                      
                      myRecipeList={myRecipeList} 
                      setMyRecipeList={setMyRecipeList}  
                    />}
                  />

                  
                  
                </>
            )
          }            
          </Routes>        
          
        </main> 
      </div>
      
      </BrowserRouter>    
    </>
  )
}

export default FoodRecipeApp;
