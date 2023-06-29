


import Header from '../comp/header';
import Footer from '../comp/Footer';
import MainContent from '../comp/MainContent';
import { Helmet } from 'react-helmet-async';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/Config';

const About = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
console.log(error)

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
    return(
  <div>
    <Header/>
    <main className='color-loading'> 
    <h2 className='loadingCss'>Loading <i className="fa-solid fa-yin-yang fa-spin fa-lg ali" style={{color: "whitesmoke"}}></i></h2>
    </main>
    <Footer/>
  </div>
    )
  }


if (user) {
  
  if (user.emailVerified) {
    return (
      <>
      <Helmet>
          <title>About us Page</title>
  
        </Helmet>
      <Header />
      <MainContent pageName="About us Page"  />   
      <Footer />
    </>
    );
  }

}
}

export default About;
