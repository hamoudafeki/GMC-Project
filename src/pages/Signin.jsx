

import Header from '../comp/header';
import Footer from '../comp/Footer';
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import {  signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase/Config'
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import './Signin.css';

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetPass, setResetPass] = useState("");
  const [hasError, setHasError] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [showForm, setShowForm] = useState("");
  const [showSendEmail, setShowSendEmail] = useState(false);
  return (
    <>
    <Helmet>
        <title>Signup </title>
      </Helmet>
    <Header />
<main>
<form className={`forgot-password ${showForm}`} >

  <div onClick={(e) => {setShowForm("")
  }} className='close'> <i class="fa-solid fa-xmark"></i> 
  </div>

<input onChange={(e) => {
  setResetPass(e.target.value)
}} required type="email" placeholder='E-mail :'/>
<button onClick={(e) => {e.preventDefault()
  sendPasswordResetEmail(auth,resetPass)
  .then(() => {
    console.log("send email")
    setShowSendEmail(true)})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
  });
}}>Reset Password </button>
{showSendEmail && <p className='check-email'>Please check your email to reset your password</p>}

</form>


<form>
  <input onChange={(e) => {setEmail(e.target.value)
  }} required type="email" placeholder='E-mail :'/>
  <input onChange={(e) => {setPassword(e.target.value)
  }} required type="password" placeholder='Password :'/>
  <button onClick={(e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user)
    navigate("/");
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
  });
  }}>Sign in</button>
  <p className="account">
    Don't have an account <Link to="/signup">Sign-up</Link>
  </p>
  <p onClick={() => {
    setShowForm("show-forgot-password")
    
  }} className='forgot-pass'>Forgot password ?</p>
  {hasError && <h2>{firebaseError}</h2>}

</form>
  </main>   
 <Footer />
  </>
  );
}

export default Signin;
