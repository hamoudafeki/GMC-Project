
import Header from '../comp/header';
import Footer from '../comp/Footer';
import { Helmet } from 'react-helmet-async';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/Config';
import { Link } from 'react-router-dom'
import {sendEmailVerification } from "firebase/auth";



const Home = () => {
const [user, loading , error] = useAuthState(auth);
console.log(error)
if (loading) {
  return(
<div>
  <Header/>
  <main className='color-loading'> 
  <h2 className='loadingCss'>Loading <i className="fa-solid fa-yin-yang fa-spin fa-lg ali" style={{color:"whitesmoke"}}></i></h2>
  </main>
  <Footer/>
</div>
  )
}

if (!user) {
  return(
    <>
    <Helmet>
      <title>Home Page</title>
      <meta name="description" content=" Home" />
    </Helmet>

    <Header />  
  
      <main>
        <p className='linktext'>
          Please{" "}
          <Link className='linkSignin' style={{fontSize:"30px"}} to="/signin">
            sign in
          </Link>{" "}
          to continue... <span><i className="fa-solid fa-heart"></i></span>
        </p>
      </main>

  
    <Footer />
</>
  )
  
}

if (user) {

if (user.emailVerified) {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content=" Home" />
      </Helmet>

      <Header />  
      <main> 
        <p>Welcome : {user.displayName} <span> <i className="fa-solid fa-heart"></i> </span> </p>
        </main>  
      <Footer />
  </>
  );
}
  if (!user.emailVerified) {
    return (
      <>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content=" Home" />
        </Helmet>
  
        <Header />  
        <main> 
          <p>Welcome : {user.displayName} <span><i class="fa-solid fa-heart"></i></span></p>
          <p>Please verify your email to continue <i className="fa-regular fa-hand fa-beat-fade"></i></p>
      <button onClick={() => {sendEmailVerification(auth.currentUser)
  .then(() => {
  console.log(" Email verification sent!")
  });
        
      }} className='delete'>Send email</button>
          </main>  
        <Footer />
    </>
    );
  }
}
};

export default Home;
