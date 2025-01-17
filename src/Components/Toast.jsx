import './Toast.css'
import { useEffect } from 'react'

export function Toast (props) { 

useEffect(() => { console.log('Notification:', props.details)
                  }, [props.details]);


  
  return (
    <>
    {props.notification && (
      <div className='toast-overlay'>
      <div className='card-container'>
        <h1>
          {props.details.quantity} {props.details.name} added to your cart
          <button onClick={props.close}>Close</button>
        </h1>
      </div>
    </div>
  )}
  </>
 );
}