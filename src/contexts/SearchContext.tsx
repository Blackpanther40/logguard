import { createContext, useContext, type ReactNode } from 'react'

const SearchContext = createContext('')

export function SearchProvider({
  value,
  children,
}: {
  value: string
  children: ReactNode
}) {
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}

export function useSearchQuery() {
  return useContext(SearchContext)
}
