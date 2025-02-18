import react from 'react'
import axios from 'axios'
import { useEffect } from 'react'

export function Orders() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleIndex = async () => {
    try {
      const response = await axios.get(`${apiKey}/orders.json`)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleIndex();
  }, [])


  return (
    <h1>Hello</h1>
  )
}