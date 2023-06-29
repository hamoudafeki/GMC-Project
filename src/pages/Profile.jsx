

import Header from '../comp/header';
import Footer from '../comp/Footer';
import { Helmet } from 'react-helmet-async';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/Config';
import Moment from 'react-moment';
import { deleteUser } from "firebase/auth";


const Profile = () => {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });
  if (loading) {
    return (
    <div>
        <Header />
      
        <main className='color-loading'>
          <h2 className='loadingCss'>Loading <i className="fa-solid fa-yin-yang fa-spin fa-lg ali" style={{color: "whitesmoke"}}></i></h2>
        </main>
            <Footer />
    </div>

    );
  }
  if (error) {
    return (
      <div>
        <p>Error:{error}</p>
      </div>
    );
  }
  
if (user) {
  return (
    <>
    <Helmet>
        <title>Profile</title>
        <style type="text/css">{`  
        main{
          flex-direction: column;
          align-items:flex-start;
          width:fit-content;
          margin : auto;
        }
        
        .delete:hover{
          color: cyan;
          box-shadow: 0 0 5px cyan;
          border-radius: 5px;
          color: black;
          transition: all 0.3s;
        
        }
        `}</style>
      </Helmet>
    <Header />
    <main> 
      <h6>Email : {user.email} </h6> 
      <h6>UserName : {user.displayName}</h6>
      <h6>Last Sign-in : <Moment fromNow date={user.metadata.lastSignInTime} className='api' /></h6>
      <h6>Account Created :  <Moment fromNow date={user.metadata.creationTime} className='api'  /> </h6>
      <button onClick={(e) => {
        deleteUser(user).then(() => {
          console.log("User deleted.")
        }).catch((error) => {
console.log(error.message) 
        });
        
      }} className='delete'>Delete account</button>
    </main>
    <Footer />
  </>
  );
}
};

export default Profile;
