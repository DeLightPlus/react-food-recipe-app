import '../App.css';
import './styles.css';

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const LoginModal = ({ showLoginModal, setShowLoginModal }) => 
{    
  
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
      
        if (username && password) 
        {
          try 
          {
            const response = await axios.get(`http://localhost:8000/users/`);
            const users = response.data;
      
            if (users.length > 0) {
              const foundUser = users.find((user) => user.username === username && user.password === password);
      
              if (foundUser) 
              {                
                alert('Successfully logging as ' + foundUser.username);
                sessionStorage.setItem('user', JSON.stringify({user_id: foundUser.id, username: username, isLoggedIn: true}) )
                navigate('/');
                setShowLoginModal(false);
              } else { alert("Invalid username or password"); }

            } else { alert("No users found");  }

          } 
          catch (error) { alert(error.message);  }

        } else { alert("Please enter both username and password"); }
      };

    return(
        <div className="Modal">
            <div className="modal_contanainer">
                <form><h1>Login</h1>                
                    <label>Username</label>
                    <input type="text" placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}                
                    />

                    <label>Password</label>
                    <input
                        type="password" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}                        
                    />

                    <button type="submit" onClick={handleLogin}>
                        Login
                    </button>

                    <button type="button" className='close-btn-modal'
                        onClick={() => { setShowLoginModal(!showLoginModal); navigate('/') }}>
                        <div className="icn">&#10060;</div>
                    </button>

                    {/* <div>click the link to <a>Register</a></div> */}

                </form>
            </div>
        </div>
    );
}

export default LoginModal;
  