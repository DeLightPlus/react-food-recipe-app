import React, { useEffect } from 'react';
import './styles.css';

import { Link, useNavigate } from 'react-router-dom';

function Navbar({showLoginModal, setShowLoginModal, isLoginModal, setModal, loggedInUser, setLoggedInUser}) 
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
        <a href="#" className="navbar-brand">
            Food Recipe
        </a>
        <ul className="nav-links">
          <li className="nav-item">
            <a href="#" className="nav-link">
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
                <li className="nav-item">
                  <Link to="/myFavoured" className="nav-link">
                    Favoured <small className="icn">&#9734;</small>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/myRecipes" className="nav-link">
                    My Recipies <small className="icn">&#127857;</small>
                  </Link>
                </li>

                <li className="nav-item">
                  <div className="nav-link" id="profile">  
                  <h2>{loggedInUser.username.substring(0, 1)}</h2>  
                  </div>
                </li>
              </>            
              
            ) : (
                  <li className="nav-item">
                    <Link to="/login" className="nav-link" id="login-link"
                      onClick={(e) => { handleModal(e) }}>  
                      { showLoginModal && isLoginModal ? 'Register' : 'Login' } </Link>            
                  </li>
            )
          
        
          }
          
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;