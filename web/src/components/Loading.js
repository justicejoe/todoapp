import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: 40,
  },
  progress: {
    margin: theme.spacing(2),
  },
}))

const Loading = ({ text }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CircularProgress disableShrink className={classes.progress} size={40} color="secondary" />
      {text ? <Typography variant="body1">Loading {text} ...</Typography> : null}
    </div>
  )
}
Loading.propTypes = {
  text: PropTypes.string,
}
Loading.defaultProps = {
  text: null,
}

export default Loading
