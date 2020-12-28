import React, { Fragment } from 'react'
import {
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
  ButtonGroup,
  Button,
} from '@material-ui/core'
import {
  EmojiObjects as EmojiObjectsIcon,
  Language as LanguageIcon,
  Create as CreateIcon,
} from '@material-ui/icons'
import { useTranslation } from 'react-i18next'

import { useApp } from '../contexts/AppContext'

import ListMenuItem from './ListMenuItem'

const Menu = () => {
  const { t } = useTranslation()

  return (
    <Fragment>
      <List
        dense
        component="nav"
        subheader={(
          <ListSubheader component="div" id="nested-list-subheader">
            {t('todoList.navHeader')}
          </ListSubheader>
        )}
      >
        <ListMenuItem exact path="/" title={t('todoList.navMenu')} icon={<CreateIcon />} />
      </List>
      <Divider />
    </Fragment>
  )
}

const AppNavMenu = () => {
  const {
    darkMode, toggleTheme, lang, switchLang,
  } = useApp()

  return (
    <List dense style={{ padding: 0 }}>
      <Menu />
      <List subheader={<ListSubheader>Settings</ListSubheader>} dense>
        <ListItem>
          <ListItemIcon>
            <EmojiObjectsIcon />
          </ListItemIcon>
          <ListItemText id="switch-theme" primary="Dark theme" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              color="primary"
              onChange={toggleTheme}
              checked={darkMode}
              inputProps={{ 'aria-labelledby': 'switch-theme' }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText id="switch-lang" primary="Language" />
          <ListItemSecondaryAction>
            <ButtonGroup
              size="small"
              aria-label="Language"
            >
              <Button
                color={lang === 'th' ? 'primary' : undefined}
                variant={lang === 'th' ? 'contained' : undefined}
                onClick={() => switchLang('th')}
              >
                TH
              </Button>
              <Button
                color={lang === 'en' ? 'primary' : undefined}
                variant={lang === 'en' ? 'contained' : undefined}
                onClick={() => switchLang('en')}
              >
                EN
              </Button>
            </ButtonGroup>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </List>
  )
}

export default AppNavMenu
