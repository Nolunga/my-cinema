import * as React from 'react'

type Props = {
  children?: React.ReactNode
}

type AppProviderProps = {
  user: any
  setUser: any
}

const AppContext = React.createContext<AppProviderProps>({
  user: undefined,
  setUser: React.Dispatch<React.SetStateAction<undefined>>
})

export const useAppContext = (): AppProviderProps => React.useContext(AppContext)

export default function AppProvider({ children }: Props) {
  const [user, setUser] = React.useState()

  const context = React.useMemo(
    () => ({
      user,
      setUser
    }),
    [user, setUser]
  )

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}
