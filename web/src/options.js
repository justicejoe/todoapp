import { indigo, red } from '@material-ui/core/colors'

export const mui = {
  theme: {
    dark: {
      palette: {
        type: 'dark',
        primary: indigo,
        secondary: red,
      },
      spacing: 4,
      overrides: {
        MuiSnackbarContent: {
          root: {
            color: 'inherit',
          },
        },
      },
    },
    light: {
      palette: {
        primary: indigo,
        secondary: red,
      },
      spacing: 4,
      overrides: {
        MuiSnackbarContent: {
          root: {
            color: 'inherit',
          },
        },
      },
    },
  },
  layout: {
    autoCollapseDisabled: false,
    collapsedBreakpoint: 'sm',
    heightAdjustmentDisabled: false,
    xs: {
      sidebar: {
        anchor: 'left',
        hidden: false,
        inset: false,
        variant: 'temporary',
        width: 240,
        collapsible: false,
        collapsedWidth: 64,
      },
      header: {
        position: 'fixed',
        clipped: true,
        offsetHeight: 56,
        persistentBehavior: 'fit',
      },
      content: {
        persistentBehavior: 'fit',
      },
      footer: {
        persistentBehavior: 'fit',
      },
    },
    sm: {
      sidebar: {
        anchor: 'left',
        hidden: false,
        inset: false,
        variant: 'temporary',
        width: 256,
        collapsible: false,
        collapsedWidth: 64,
      },
      header: {
        position: 'fixed',
        clipped: true,
        offsetHeight: 64,
        persistentBehavior: 'fit',
      },
      content: {
        persistentBehavior: 'fit',
      },
      footer: {
        persistentBehavior: 'fit',
      },
    },
    md: {
      sidebar: {
        anchor: 'left',
        hidden: false,
        inset: false,
        variant: 'temporary',
        width: 256,
        collapsible: false,
        collapsedWidth: 64,
      },
      header: {
        position: 'fixed',
        clipped: true,
        offsetHeight: 64,
        persistentBehavior: 'fit',
      },
      content: {
        persistentBehavior: 'fit',
      },
      footer: {
        persistentBehavior: 'fit',
      },
    },
  },
}
