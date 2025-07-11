"use client"
import { createContext, useEffect, useState } from "react"

export const DarkModeContext = createContext()

export  function DarkModeProvider({children}) {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode')
        if (savedMode) {
            setDarkMode(savedMode === 'true')
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode)
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    const toggleDarkMode = () => setDarkMode(!darkMode)



  return (
    <div>
        <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    </div>
  )
}
