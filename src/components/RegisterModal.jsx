import '../App.css';
import './styles.css';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RegisterModal = ({ showLoginModal, setShowLoginModal }) => 
{    
    const navigate = useNavigate();
    const currentTime = new Date().getTime();
    const [userId, setUserId] = useState(`${Math.floor(Math.random() * 100000)}${currentTime}`);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistration = (e) => 
    {
        e.preventDefault();
        let reg_info = { id: userId, username: username, email: email, password: password }

        fetch("http://localhost:8000/users", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(reg_info)
        }).then((res) => {
            alert('Registered successfully.')
            navigate('/');
        }).catch((err) => {
            alert.error('Failed :' + err.message);
        });
        // Call API to login user
        console.log('Registering in user...', reg_info);
        // navigate('/')
    };

    return(
        <div className="Modal">
            <div className="modal_contanainer">
                <form><h1>Register</h1>                
                    <label>Username</label>
                    <input type="text" placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}                
                    />

                    <label>Email</label>
                    <input type="email" placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />                                       

                    <label>Password</label>
                    <input
                        type="password" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}                        
                    />
                    <div><input type="checkbox" /> subscribe to recieve recipe updates.</div>
                    <button type="submit" onClick={ handleRegistration }>
                        Signup
                    </button>

                    <button type="button" className='close-btn-modal'
                        onClick={() => { setShowLoginModal(!showLoginModal); navigate('/'); }}>
                        <div className="icn">&#10060;</div>
                    </button>

                    {/* <div>click the link to <Link >Register</Link></div> */}

                </form>
            </div>
        </div>
    );
}

export default RegisterModal;
  