
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
// import Css from "./pages/css";
import Profile from "./pages/Profile";
import {useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Error404 from './pages/Error404';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error404/>,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  const {theme} = useContext(ThemeContext);
  return (

<div className={`${theme}`}>
  <RouterProvider router={router} />
  
</div>
  ) 
}

export default App;
