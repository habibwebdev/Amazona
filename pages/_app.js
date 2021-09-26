import { useEffect } from 'react'
import '../styles/globals.css'
import { StoreProvider } from '../utils/Store'

function MyApp({ Component, pageProps }) {
  // For serverside rendering of material ui Elements in conjuction of creation of _document.js file
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}

export default MyApp
