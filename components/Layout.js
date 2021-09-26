import React from 'react'

// import { Head } from 'next/head'
import Head from 'next/head'
import NextLink from 'next/link'
import useStyles from '../utils/styles'
import { AppBar, Container, Link, Toolbar, Typography } from '@material-ui/core'

export default function Layout({ title, children, description }) {
  const classes = useStyles()
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Next Amazona` : 'Next Amazona'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <NextLink href="/" passHref>
            <Link>
              <Typography className={classes.brand}>amazona</Typography>
            </Link>
          </NextLink>
          <div className={classes.grow}></div>
          <div>
            <NextLink href="/cart">Cart</NextLink>
            <NextLink href="/login">Login</NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All right reserved. Next Amazona.</Typography>
      </footer>
    </div>
  )
}
