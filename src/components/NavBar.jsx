import './styles.css';
import SearchRecipe from './SearchRecipe';

import React, { useEffect } from 'react';
import { BrowserRouter, Link, Route, useNavigate } from 'react-router-dom';

function Navbar(
  {
    navState, setNavState,
    showLoginModal, setShowLoginModal,
    isLoginModal, setModal, 
    loggedInUser, setLoggedInUser,
    searchInput, setSearchInput,
    handleSearch,
    showMyRecipeList, setShowMyRecipeList,
    showMyFavoured, setShowMyFavouredRecipes,
    showAddRecipeModal, setShowAddRecipeModal
  }) 
{
  const navigate = useNavigate();

  useEffect(() => 
    {
      if(!loggedInUser )
      {
        navigate('/')
      }
      else
      {
        console.log(loggedInUser);        
      }

    }, [])

  const handleModal = (e) =>
  {
    e.preventDefault();     

    setShowLoginModal(true); 
    navigate('/login')
    
    if(showLoginModal && isLoginModal)
    {
      setModal(!isLoginModal);
      navigate('/register');
    }
    else if(showLoginModal && !isLoginModal)
    {
      setModal(!isLoginModal);
      navigate('/login');
    }    
  }

  return (
    
    <nav className="navbar">
      <div className="container">
        <a href="/" className="navbar-brand">
            Food Recipe
        </a>
        <ul className="nav-links">
          <li className="nav-item">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Contact
            </a>
          </li>         

          { 
            loggedInUser ? (  
              <> 
                <div className="">
                  <div className="nav-link" id="profile">  
                    <h2>{loggedInUser.username.substring(0, 1)}</h2>  
                  </div>
                </div>
              </>            
              
            ) : (
                  <li className="nav-item" id="login-link">
                    <Link to="/login" className="nav-link" 
                      onClick={(e) => { handleModal(e) }}>  
                      { showLoginModal && isLoginModal ? 'Register' : 'Login' } </Link>            
                  </li>
            )              
          }
          
        </ul>

        { !showAddRecipeModal && 
          <SearchRecipe
            searchInput={searchInput} 
            setSearchInput={setSearchInput}
            handleSearch={handleSearch} 
          />
        } 

        <ul className="nav-links" style={{alignSelf:'end'}}>
        
        <li className="nav-item">
          <select onChange={(e) => { console.log('Category:', e.target.value); } } >
              {/* <input placeholder='Category'/> */}
              <option value=""> Category </option>
              <option value="Miscellaneous">Miscellaneous</option>
              <option value="Seafood">Seafood</option>
              <option value="">Desset</option>
              <option value="">Side</option>
              <option value="">Beef</option>
          </select>
        </li>

        { 
          loggedInUser && 
          <li className="nav-item">
            <Link to="/myRecipes" className="nav-link" 
                onClick={() => {
                  setNavState("myRecipe")
                  setShowMyRecipeList(true)}
                }>
              MyRecipies 
              {/* <small className="icn">&#127857;</small> */}
            </Link>
          </li>          
        }
        
        {
            showMyRecipeList &&       
            <>
              <li className="nav-item">
                <Link className="nav-link" 
                  onClick={() => setShowMyFavouredRecipes(true)}> MyFavoured </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" 
                  onClick={() => setShowAddRecipeModal(true)}> Add-Recipes </Link>
              </li>          
            </>
          }

        </ul>
      </div>

      
    </nav>
 
  );
}

export default Navbar;