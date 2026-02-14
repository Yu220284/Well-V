'use client'

import { useState, useEffect } from 'react'

export function useDiamonds() {
  const [diamonds, setDiamonds] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('wellv_diamonds')
    setDiamonds(stored ? parseInt(stored) : 0)
  }, [])

  const addDiamonds = (amount: number) => {
    const newAmount = diamonds + amount
    setDiamonds(newAmount)
    localStorage.setItem('wellv_diamonds', newAmount.toString())
  }

  const spendDiamonds = (amount: number) => {
    if (diamonds >= amount) {
      const newAmount = diamonds - amount
      setDiamonds(newAmount)
      localStorage.setItem('wellv_diamonds', newAmount.toString())
      return true
    }
    return false
  }

  return { diamonds, addDiamonds, spendDiamonds }
}
