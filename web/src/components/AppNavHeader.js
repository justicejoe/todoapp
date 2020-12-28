import React, { Fragment } from 'react'
import { Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(({ mixins }) => ({
  header: {
    ...mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const AppNavHeader = () => {
  const classes = useStyles()
  return (
    <Fragment>
      <div className={classes.header}>
        <Typography variant="h6" color="inherit" noWrap>
          {process.env.REACT_APP_APP_NAME}
        </Typography>
      </div>
      <Divider />
    </Fragment>
  )
}

export default AppNavHeader
