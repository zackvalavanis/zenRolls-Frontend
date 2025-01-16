import './Toast.css'
import { useEffect } from 'react'

export function Toast (props) { 

  
  return ( <>{props.notification && (
    <div className='toast-overlay'>
    <div className='card-container'>
       <h1>
         The order has been added to your cart
         <button onClick={props.close}>Close</button>
       </h1>
    </div>
    </div>
  )}</>
 )
}