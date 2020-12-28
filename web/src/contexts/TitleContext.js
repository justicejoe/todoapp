import React, { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

const TitleContext = createContext()

export const TitleProvider = ({ children, title: defaultTitle }) => {
  const [title, setTitle] = useState(defaultTitle)
  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  )
}
TitleProvider.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
}
TitleProvider.defaultProps = {
  children: null,
  title: 'Title',
}

export const TitleConsumer = TitleContext.Consumer

export const useTitle = () => useContext(TitleContext)

export default TitleContext
