import { useState } from 'react'

export const useCounter = (initialState) => {
  const [counter, setCounter] = useState(initialState)

  const nextValue = () => {
    const result = counter
    setCounter (counter + 1)
    return result
  }

  const reset = () => {
    setCounter (initialState)
  }

  return {
    nextValue,
    reset
  }
}