import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { useLayoutCtx } from '@mui-treasury/layout'

const ListMenuItem = (props) => {
  const {
    path, title, className, icon,
  } = props
  const { pathname } = useLocation()
  const { setOpened } = useLayoutCtx()
  return (
    <ListItem
      button
      className={className}
      to={path}
      component={Link}
      selected={pathname === path}
      onClick={() => setOpened(false)}
    >
      {icon && (
        <ListItemIcon>
          {icon}
        </ListItemIcon>
      )}
      <ListItemText primary={title} />
    </ListItem>
  )
}
ListMenuItem.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.node,
}
ListMenuItem.defaultProps = {
  className: null,
  icon: null,
}

export default ListMenuItem
