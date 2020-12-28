import React, {
  createContext, useContext, useCallback,
} from 'react'
import PropTypes from 'prop-types'
import createPersistedState from 'use-persisted-state'
import { useTranslation } from 'react-i18next'

const AppContext = createContext()

const useDarkModeState = createPersistedState('darkMode')
const useLangState = createPersistedState('lang')

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useDarkModeState(false)
  const toggleTheme = useCallback(
    () => setDarkMode(state => !state),
    [setDarkMode],
  )
  return {
    darkMode,
    toggleTheme,
  }
}

const useLang = () => {
  const [lang, setLang] = useLangState('en')
  const { i18n } = useTranslation()
  const switchLang = useCallback(
    (newLang) => {
      setLang(newLang)
      i18n.changeLanguage(newLang)
    },
    [setLang, i18n],
  )
  return {
    lang,
    switchLang,
  }
}

export const AppProvider = ({ children }) => {
  const darkMode = useDarkMode()
  const lang = useLang()
  return (
    <AppContext.Provider value={{
      ...darkMode,
      ...lang,
    }}
    >
      {children}
    </AppContext.Provider>
  )
}
AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const AppCunsumer = AppContext.Consumer

export const useApp = () => useContext(AppContext)

export default AppContext
