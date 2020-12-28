import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Content } from '@mui-treasury/layout'

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    minHeight: 'calc(100vh - 45px)',
    padding: spacing(4),
    [breakpoints.up('sm')]: {
      minHeight: 'calc(100vh - 53px)',
    },
  },
}))

const AppContent = (props) => {
  const classes = useStyles()
  return <Content className={classes.root} {...props} />
}

export default AppContent
