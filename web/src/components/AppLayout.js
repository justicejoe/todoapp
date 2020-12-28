import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  createMuiTheme,
  CssBaseline,
  Toolbar,
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons'
import {
  Root,
  Header,
  Sidebar,
  CollapseBtn,
  SidebarTrigger,
} from '@mui-treasury/layout'
import { SnackbarProvider } from 'notistack'

import { mui } from '../options'
import { useApp } from '../contexts/AppContext'

import AppHeader from './AppHeader'
import AppNavHeader from './AppNavHeader'
import AppNavMenu from './AppNavMenu'
import AppContent from './AppContent'
import AppFooter from './AppFooter'

const AppLayout = ({ children }) => {
  const { darkMode } = useApp()
  const selectedTheme = darkMode ? 'dark' : 'light'
  const theme = useMemo(
    () => createMuiTheme(mui.theme[selectedTheme]),
    [selectedTheme],
  )
  return (
    <Root theme={theme} config={mui.layout}>
      {({
        headerStyles, sidebarStyles, collapsed, opened,
      }) => (
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <CssBaseline />
          <Header color="primary">
            <Toolbar>
              <SidebarTrigger className={headerStyles.leftTrigger} color="inherit">
                {opened ? <ChevronLeftIcon /> : <MenuIcon />}
              </SidebarTrigger>
              <AppHeader />
            </Toolbar>
          </Header>
          <Sidebar>
            <AppNavHeader />
            <div className={sidebarStyles.container}>
              <AppNavMenu />
            </div>
            <CollapseBtn className={sidebarStyles.collapseBtn}>
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </CollapseBtn>
          </Sidebar>
          <AppContent>
            {children}
          </AppContent>
          <AppFooter />
        </SnackbarProvider>
      )}
    </Root>
  )
}
AppLayout.propTypes = {
  children: PropTypes.node,
}
AppLayout.defaultProps = {
  children: null,
}

export default AppLayout
