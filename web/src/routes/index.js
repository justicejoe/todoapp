import React from 'react'
import { useRoutes } from 'react-router-dom'

import IndexPage from '../pages/IndexPage'

const Routes = () => {
  const element = useRoutes([
    { path: '/', element: <IndexPage /> },
  ])
  return element
}

export default Routes
