import './App.css';

import Navbar from './components/Header.jsx';
import LoginModal from './components/auth/LoginModal.jsx';
import RegisterModal from './components/auth/RegisterModal.jsx';
import Meal from './components/recipes/Meal.jsx';
import MyRecipe from './components/recipes/MyRecipe.jsx';
import addRecipe from './components/recipes/AddRecipe.jsx';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import HomePage from './components/Home.jsx';


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

        <main>        

          <Routes>
          { showLoginModal &&
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
<<<<<<< HEAD
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
=======
>>>>>>> c8c54b8b8e127dbbd0dd8bda0453cffbe3cd317e
            )
          }

            <Route path='/' element={<HomePage />} />             
            <Route path='/Recipes' element={
              <Meal 
                showMyRecipeList={showMyRecipeList}
                recipeList={recipeList}                             
                myRecipeList={myRecipeList} 
                setMyRecipeList={setMyRecipeList} 
                myFavouredRecipes = {myFavouredRecipes}
              />}
            />           
                                   
                                   {console.log(myFavouredRecipes)}
            <Route path="/myRecipes" element={
              
              <MyRecipe
                showMyRecipeList={showMyRecipeList}
                showMyFavoured={showMyFavoured}
                recipeList={recipeList}                      
                myRecipeList={myRecipeList}               
                myFavouredRecipes = { myFavouredRecipes }                
                showAddRecipeModal={showAddRecipeModal}
                setShowAddRecipeModal={setShowAddRecipeModal}  
              />}
            />  
                       
          </Routes>        
          
        </main> 
      </div>      
      </BrowserRouter>    
    </>
  )
}

export default FoodRecipeApp;
