import './App.css'
import { HomePage } from './HomePage/HomePage.tsx'
import { Menu } from './Menu/Menu.jsx'
import { Cart } from './Cart/Cart.tsx'
import { LoginPage } from './User_auth/LoginPage.jsx'
// import { Logout } from './User_auth/Logout.jsx'
import { SignupPage } from './User_auth/SignupPage.jsx'


import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";


const router = createBrowserRouter([
  {
    element: ( 
      <div>
        <Outlet />
      </div>
    ), 
    children: [
      { 
        path: '/', 
        element: <HomePage/>
      }, 
      { 
        path: '/Menu', 
        element: <Menu />
      },
      { 
        path: '/Cart', 
        element: <Cart/>
      }, 
      { 
        path: '/LoginPage', 
        element: <LoginPage/>
      }, 
      { 
        path: './SignupPage', 
        element: <SignupPage/>
      }
    ]
  }
])


function App() {
 return ( 
  <RouterProvider router={router} />
 )
}

export default App
