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
  const[recipeList, setRecipeList]=useState([]); 

  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);

  const [showMyFavoured, setShowMyFavouredRecipes] = useState(false); 
  const[myFavouredRecipes, setMyFavouredRecipes]=useState([]);

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
            handleRecipeList();  
            handleMyRecipeList(loggedInUser.user_id); 
            handleMyFavouredRecipes(loggedInUser.user_id);      
          }            
          else console.log('no user loggedIn');
               
        }

        console.log(myFavouredRecipes);
        

     }, []);

  const handleRecipeList = async () =>
  { 
        const url = `http://localhost:8000/recipes`;
        await axios.get(url)
        .then(response => { 
          setRecipeList(response.data); 
          console.log('List',response.data) })
        .catch(error => { console.error(error);  });          
    
  }

  const handleMyRecipeList = async (user_id) =>
  {    
    console.log("uid" ,user_id);
    
    const my_url = `http://localhost:8000/recipes?addedBy=${user_id}`;
    try {
      const response = await fetch(my_url);      
      
      // Check if the response is successful (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }     
  
      // Parse the response body as JSON
      const data = await response.json();
      const filteredRecipes = data.filter(recipe => recipe.strCreativeCommonsConfirmed === 'public');
  
      // Update the state with the fetched data
      setMyRecipeList(filteredRecipes);
  
      // Log the data to the console
      console.log('myList_public', filteredRecipes);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }

  const handleMyFavouredRecipes = (user_Id) =>
    {
      // console.log('app.73 id:', user_Id);
      
      const url = `http://localhost:8000/favoured-recipes?user_id=${user_Id}`;
      axios.get(url)
      .then(response => { setMyFavouredRecipes(response.data); console.log('myFavList.response',response.data) })
      .catch(error => { console.error(error);  });    
  
    }

  const searchRecipe = () => 
  {
    
  }
    
  const handleSearch = (e) =>
  {   
    e.preventDefault();
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
            )
          }

            <Route path='/' element={<HomePage myRecipeList={myRecipeList}/>} /> 

            {console.log(myFavouredRecipes)}
            <Route path="/Recipes" element={              
              <MyRecipe                
                showMyFavoured={showMyFavoured}                  
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
