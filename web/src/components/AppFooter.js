import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Footer } from '@mui-treasury/layout'

const useStyles = makeStyles(({ palette, spacing }) => ({
  root: {
    borderColor: palette.divider,
  },
  text: {
    marginBottom: 0,
    padding: spacing(1),
    textAlign: 'center',
  },
}))

const AppFooter = () => {
  const classes = useStyles()
  return (
    <Footer className={classes.root}>
      <Typography className={classes.text} variant="body2" color="inherit" noWrap>{process.env.REACT_APP_APP_COPYRIGHT}</Typography>
    </Footer>
  )
}

export default AppFooter
