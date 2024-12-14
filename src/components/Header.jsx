import './styles.css';
import SearchRecipe from './recipes/SearchRecipe';

import  { useEffect } from 'react';
import {  Link, useNavigate } from 'react-router-dom';

const Header = (
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
  }) =>
{
  const navigate = useNavigate();

  useEffect(() => 
    {
      if(!loggedInUser )
      {
        // navigate('/')
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
    <>
    <header>
      <div className="logo">
        <a href="/" className="navbar-brand">
          Food Recipe
        </a>
      </div>
      <nav className="navbar"> 
          <ul className="nav-links">
            <li className="nav-item">
              <a href="/Recipes" className="nav-link">
                RECIPES
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                ABOUT
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                CONTACT US
              </a>
            </li>
          </ul>
      </nav>

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
          <>
            <div className="nav-item" id="login-link">
              <Link to="/login" className="nav-link" 
                onClick={(e) => { handleModal(e) }}>  
              { showLoginModal && isLoginModal ? 'Register' : 'Login' } </Link>            
            </div>
          </>
        )              
      }
    </header>

    <div className="searchNfilter">
      <ul className="nav-links" style={{alignSelf:'end'}}>

      {/* <li className="nav-item">
        <select onChange={(e) => { console.log('Category:', e.target.value); } } >
            <option value=""> Category </option>
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Seafood">Seafood</option>
            <option value="">Desset</option>
            <option value="">Side</option>
            <option value="">Beef</option>
        </select>
      </li> */}
      

      { 
        loggedInUser && 
        <li className="nav-item">
          <Link to="/myRecipes" className={`nav-link ${showMyRecipeList ? "active":""}`}
              onClick={() => {
                
                setShowMyRecipeList(true)}
              }>
<<<<<<< HEAD
            My Recipe Book {">"}
=======
            RecipesBook {">"}
>>>>>>> c8c54b8b8e127dbbd0dd8bda0453cffbe3cd317e
            {/* <small className="icn">&#127857;</small> */}
          </Link>
        </li>          
      }

      {
          showMyRecipeList &&       
          <>
            <li className="nav-item">
              <Link className="nav-link" 
                onClick={() => setShowMyFavouredRecipes(true)}> My Favoured </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" 
                onClick={() => setShowAddRecipeModal(true)}> Add-New-Recipes </Link>
            </li>          
          </>
        }

      </ul>
      
      { 
        !showAddRecipeModal && 
        <SearchRecipe
          searchInput={searchInput} 
          setSearchInput={setSearchInput}
          handleSearch={handleSearch} 
        />
      } 
      
    </div>
 </>
  );
}

export default Header;



