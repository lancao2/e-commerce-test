import {createBrowserRouter} from "react-router-dom";
import LoginPage from "./modules/auth/pages/login";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage/>    
    },
    {
      path: "/dashboard",
      element: <h1>Dashboard</h1>   
    },

  ]);

export default router