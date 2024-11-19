import './App.css';

import Navbar from './components/Header.jsx';
import LoginModal from './components/LoginModal.jsx';
import RegisterModal from './components/RegisterModal.jsx';
import Meal from './components/Meal.jsx';
import MyRecipe from './components/MyRecipe.jsx';
import addRecipe from './components/AddRecipe.jsx';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header.jsx';


function FoodRecipeApp() 
{  
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null);

  const [navState, setNavState] = useState("")

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoginModal, setModal] = useState(true);  

  const[searchInput,setSearchInput]=useState("");

  const [showMyRecipeList, setShowMyRecipeList] = useState(false);
  const[myRecipeList, setMyRecipeList]=useState([]); 

  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);

  const [showMyFavoured, setShowMyFavouredRecipes] = useState(false); 
  const[myFavouredRecipes, setMyFavouredRecipes]=useState([]);

  useEffect(() => 
    {  
        let user = sessionStorage.getItem('user')
        console.log(user);
        
        if(user !== '' || user !== null)
        {
          setLoggedInUser(JSON.parse(user));
          console.log(loggedInUser);
          
          if(loggedInUser !== null)
          {
            console.log('logged in: ', loggedInUser.isLoggedIn);  
            handleMyRecipeList(); 
            handleMyFavouredRecipes(loggedInUser.user_id);      
          }            
          else console.log('no user loggedIn');               
        }
     }, []);

  const handleMyRecipeList = () =>
  {
    const url = `http://localhost:8000/recipes`;
    axios.get(url)
    .then(response => {
       setMyRecipeList(response.data); 
       console.log('myList', response.data) })
    .catch(error => { console.error(error);  });    

  }

  const handleMyFavouredRecipes = (user_Id) =>
    {
      console.log('app.73 id:', user_Id);
      
      const url = `http://localhost:8000/favoured-recipes?user_id=${user_Id}`;
      axios.get(url)
      .then(response =>
        { 
          setMyFavouredRecipes(response.data); 
          console.log('myFavList.response',response.data) 
        })
      .catch(error => { console.error(error);  });    
  
    }

  const searchRecipe = () => 
  {
    const url = `${searchInput}`;   
  }
    
  const handleSearch = (e) =>
  {   
    if(e.key == "Enter" || e.type == "click")
    {
      searchRecipe();     
    }        
  }
  

  return (
    <><BrowserRouter>
      <div className="RecipeApp">        
          <Header
            navState={navState}
            setNavState={setNavState}

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

            showMyFavoured={showMyFavoured}
            setShowMyFavouredRecipes={setShowMyFavouredRecipes}

            showAddRecipeModal={showAddRecipeModal}
            setShowAddRecipeModal={setShowAddRecipeModal}
          />

        <div className="showcase">
          <p>...</p>
        </div>

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
                  <Route path="/Recipes" element={
                    <MyRecipe                      
                      showMyFavoured={showMyFavoured}                    
                      myRecipeList={myRecipeList} 
                      setMyRecipeList={setMyRecipeList}
                      myFavouredRecipes = {myFavouredRecipes}
                      setMyFavouredRecipes={setMyFavouredRecipes}
                      showAddRecipeModal={showAddRecipeModal}
                      setShowAddRecipeModal={setShowAddRecipeModal}  
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
