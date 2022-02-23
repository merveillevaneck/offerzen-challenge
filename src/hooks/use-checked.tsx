import { useState, useCallback, useMemo } from 'react'

export const useChecked = (initialState?: boolean) => {

  const [checked, setChecked] = useState<boolean>(initialState || false)
  const handleOnCheckChange = useCallback((e: any) => setChecked(e.target.checked), [setChecked])

  return useMemo(() => [
    checked,
    setChecked
  ] as const, [
    checked, 
    setChecked
  ])
}