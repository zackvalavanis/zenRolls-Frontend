import './Toast.css'
import React from 'react'

import { useEffect } from 'react'
type Props = {
  details: {
    name: string;
    quantity: number;
    message: string;
  }
  close: () => void;
  type: string;
  notification: boolean;
  setNotification: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Toast(props: Props) {

  useEffect(() => {
    console.log('Notification:', props.details)
  }, [props.details]);

  return (
    <>
      {props.notification && (
        <div className='toast-overlay'>
          <div className='card-container'>
            {props.type === 'add-to-cart' ? (
              <>
                <h1>
                  {props.details.quantity > 1 ?
                    `${props.details.quantity} ${props.details.name}'s have been added to your cart.`
                    :
                    `${props.details.quantity} ${props.details.name} has been added to cart.`
                  }
                </h1>
                <div>
                  <button className='close-button' onClick={props.close}>Close</button>
                </div>
              </>
            ) : props.type === 'order-success' ? (
              <h1>
                Your items have been ordered successfully!
                <button onClick={props.close}>Close</button>
              </h1>
            ) : (
              <h1>
                {props.details.message}
                <button onClick={props.close}>Close</button>
              </h1>
            )}
          </div>
        </div>
      )}
    </>
  );
}