import './App.css'
import { HomePage } from './HomePage/HomePage.jsx'
import { Menu } from './Menu/Menu.jsx'


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
