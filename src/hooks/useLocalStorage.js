import { useState, useEffect } from 'react';

export default (key, initialValue = '') => {
  const [value, setValue] = useState(() => {
    return window.localStorage?.getItem(key) || initialValue;
  })

  useEffect(() => {
    window.localStorage?.setItem(key, value)
  }, [key, value])
  return [value, setValue];
}