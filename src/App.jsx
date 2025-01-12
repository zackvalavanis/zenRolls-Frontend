import './App.css'
import { HomePage } from './HomePage/HomePage.tsx'
import { Menu } from './Menu/Menu.jsx'
import { Cart } from './Cart/Cart.tsx'


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
