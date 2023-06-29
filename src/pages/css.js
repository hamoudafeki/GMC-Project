import Header from '../comp/header';
import Footer from '../comp/Footer';
import MainContent from '../comp/MainContent';
import { Helmet } from 'react-helmet-async';




const Css = () => {
  return (
    <>
     <Helmet>
        <title>About us Page</title>
        <meta name="description" content="Checkpoint Project LabPhase" />

      </Helmet>
    <Header />
   
   
   
    <MainContent pageName="About ujjjjjjjs Page" />  


    <Footer />
  </>
  );
}

export default Css;
