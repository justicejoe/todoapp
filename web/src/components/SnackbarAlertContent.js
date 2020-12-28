import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Snackbar } from '@material-ui/core'
import { Alert as MuiAlert } from '@material-ui/lab'

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />

const SnackbarAlertContent = ({
  className, message, onClose, variant, open, actions, ...other
}) => (
  <Fragment>
    {/* {console.log('kkkkk', actions)} */}
    {actions !== null ? (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        action={actions}
        {...other}
      >
        <Alert onClose={onClose} severity={variant}>
          {message}
        </Alert>
      </Snackbar>
    ) : (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        {...other}
      >
        <Alert onClose={onClose} severity={variant}>
          {message}
        </Alert>
      </Snackbar>
    )}
  </Fragment>
)

SnackbarAlertContent.propTypes = {
  actions: PropTypes.node,
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
}
SnackbarAlertContent.defaultProps = {
  actions: null,
  className: null,
  message: null,
  open: false,
  onClose: () => {},
}

export default SnackbarAlertContent
