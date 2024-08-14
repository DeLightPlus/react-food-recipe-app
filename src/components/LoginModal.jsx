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

    const handleLogin = async (e) => 
    {
        e.preventDefault();

        if(username && password)
        {
            //alert(username && password)
            let inputobj = { "username": username, "password": password };
            // const token = jwt.sign({ username }, 'process.env.SECRET_KEY', 
            //     {  expiresIn: '1h', });

            try
            {
                const response = await axios.post(`http://localhost:8000/users`, inputobj)
                const user = response.data;
                console.log(`Logged in as ${user.username}`);
                
            }
            catch (error) {  alert(error.message);  }            
            
        }        
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
  