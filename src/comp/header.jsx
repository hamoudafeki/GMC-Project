import React from "react";
import { Link, NavLink } from "react-router-dom";
import './Header.css';
import '../comp/Theme.css';
import {useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/Config'
import { signOut } from "firebase/auth";


const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <div>
      <header className="hide-when-mobile ali">
        <h1>
          <Link className="logo" to="/">GMC Project</Link>
        </h1>
    
<i onClick={() => 
      { toggleTheme(theme=== "Light"? "Dark" : "Light")} } className="fa-regular fa-moon"></i>   

<i onClick={() => 
      { toggleTheme(theme=== "Light"? "Dark" : "Light")} } className="fa-regular fa-sun"></i>
        
        <ul className="flex">

          {!user &&   <li className="main-list">
            <NavLink className="main-link" to="/Signin">
            Sign-in
            </NavLink>
            
          </li> }
        {!user && <li className="main-list">
            <NavLink className="main-link" to="/Signup">
            Sign-up
            </NavLink>
            
          </li>}

          {user && <li onClick={() => {signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
            
          }} className="main-list">
            <button className="main-link signout">
            Sign-out
            </button>
          </li>}

          {user && <li className="main-list">
            <NavLink className="main-link" to="/about">
About           
 </NavLink>
        
          </li>}
          
      {user && <li className="main-list">
            <NavLink className="main-link" to="/profile">
Profile           
 </NavLink>
        
          </li>}
        </ul>
      </header>

    </div>
  );
};

export default Header;
