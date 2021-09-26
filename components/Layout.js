import React, { useContext } from 'react'
import Cookies from 'js-cookie'
// import { Head } from 'next/head'
import Head from 'next/head'
import NextLink from 'next/link'
import useStyles from '../utils/styles'
import {
  AppBar,
  Container,
  createMuiTheme,
  CssBaseline,
  Link,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { Store } from '../utils/Store'

export default function Layout({ title, children, description }) {
  const { state, dispatch } = useContext(Store)
  const { darkMode } = state
  // create theme
  const theme = createMuiTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
    },
  })
  const classes = useStyles()
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' })
    const newDarkMode = !darkMode
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF')
  }
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazona` : 'Next Amazona'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>amazona</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href="/cart">Cart</NextLink>
              <NextLink href="/login">Login</NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All right reserved. Next Amazona.</Typography>
        </footer>
      </ThemeProvider>
    </div>
  )
}
