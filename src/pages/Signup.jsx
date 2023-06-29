

import Header from '../comp/header';
import Footer from '../comp/Footer';
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import { auth } from "../firebase/Config";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification  } from "firebase/auth";
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [userName, setUserName] = useState("");
  const [user, loading , error] = useAuthState(auth);

// Loading
// not sign-in
// sign-in without Email verfication
// (sign-in && verified email)=> navigate(/)

console.log(error)
useEffect(() => {
  if (user) {
    if (user.emailVerified) {
      navigate("/")
    }
  }
})
if (loading) {
  return(
<div>
  <Header/>
  <main> 
  <h2>Loading <i class="fa-solid fa-yin-yang fa-spin fa-lg" style={{color: "#1b1b1d;"}}></i></h2>
  </main>
  <Footer/>
</div>
  )
}
if (user) {
  if (!user.emailVerified) {
    return(
  <div>
    <Header/>
    <main> 
      <p>
        We send you an email to verify your Account 
      </p>
      <button className='delete'>Send again</button>
    </main>
    <Footer/>
  </div>
    )
  }
  
}
if (!user) {
  return(
    <>
    <Helmet>
      <title>Signup </title>
      </Helmet>
    <Header />
    <main>
<form>
  <p style={{fontSize:"23px", marginBottom:"22px"}}>Create a new account <span>🧡</span></p>
  <input onChange={(e) => { setUserName(e.target.value) }} 
  required type="text" placeholder='UserName :'/>
  <input onChange={(e) => { setEmail(e.target.value) }} required type="email" placeholder='E-mail :'/>
  <input onChange={(e) => { setPassword(e.target.value) }}  required type="password" placeholder='Password :'/>
  <button onClick={(e) => { 
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    sendEmailVerification(auth.currentUser)
  .then(() => {
    console.log("Email verification sent!")
    
  });
    updateProfile(auth.currentUser, {
      displayName: userName, 
    }).then(() => {
      navigate("/");
      // ...
    }).catch((error) => {
      // An error occurred
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    setHasError(true)
    setFirebaseError(errorCode)

switch (errorCode) {
  case "auth/invalid-email":
    setFirebaseError("Wrong Email")
    break;

    case "auth/user-not-found":
      setFirebaseError("Wrong Email, user404")
    break;

    case "auth/wrong-password":
      setFirebaseError("Wrong Password")
    break;

    case "auth/too-many-requests":
      setFirebaseError("Too many requests, please try later <span>🧡</span>")
    break;

  default:
    setFirebaseError("Please check your email & password")
    break;
}

  }); }}>Sign up</button>
  <p className="account">
    Already have an account <Link to="/signin">Sign-in</Link>
  </p>
  {hasError && <h2>{firebaseError}</h2>}
</form>
  </main>   
 <Footer />
  </>
  );
}
}

export default Signup;
