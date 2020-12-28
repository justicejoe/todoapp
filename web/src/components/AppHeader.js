import React, { Fragment } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { useTitle } from '../contexts/TitleContext'

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
})

const AppHeader = () => {
  const classes = useStyles()
  const { title } = useTitle()
  return (
    <Fragment>
      <Typography variant="h6" color="inherit" noWrap className={classes.grow}>{title}</Typography>
    </Fragment>
  )
}

export default AppHeader
