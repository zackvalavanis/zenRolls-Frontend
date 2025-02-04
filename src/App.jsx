import './App.css'
import { HomePage } from './HomePage/HomePage.tsx'
import { Menu } from './Menu/Menu.tsx'
import { Cart } from './Cart/Cart.tsx'
import { LoginPage } from './User_auth/LoginPage.jsx'
// import { Logout } from './User_auth/Logout.jsx'
import { SignupPage } from './User_auth/SignupPage.jsx'
import { History } from './History/History.tsx'


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
        path: '/menu', 
        element: <Menu />
      },
      { 
        path: '/cart', 
        element: <Cart/>
      }, 
      { 
        path: '/login-page', 
        element: <LoginPage/>
      }, 
      { 
        path: '/signup-page', 
        element: <SignupPage/>
      }, 
      { 
        path: '/history-page', 
        element: <History />
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
