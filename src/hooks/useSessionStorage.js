import { useState } from "react"

function useSessionStorage(key, initialValue) {
  // Get from session storage by key
  const storedValue =
    typeof window !== "undefined" && sessionStorage.getItem(key)
  const initial = storedValue ? JSON.parse(storedValue) : initialValue

  // State to store our value
  const [value, setValue] = useState(initial)

  // Return a wrapped version of useState's setter function that persists the new value to sessionStorage.
  const setStoredValue = (newValue) => {
    setValue(newValue)
    sessionStorage.setItem(key, JSON.stringify(newValue))
  }

  // Remove a value from the session storage
  const removeStoredValue = () => {
    setValue(undefined)
    sessionStorage.removeItem(key)
  }

  // Clear entire session storage
  const clearSessionStorage = () => {
    sessionStorage.clear()
  }

  return [value, setStoredValue, removeStoredValue, clearSessionStorage]
}

export default useSessionStorage
